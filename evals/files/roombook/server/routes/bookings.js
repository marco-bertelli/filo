import { Router } from 'express'
import { allow } from '../auth.js'
import { Booking, Room } from '../db.js'
import { MAX_ACTIVE_BOOKINGS } from '../models/booking.js'
import { notify } from '../notify.js'

const router = Router()
const ACTIVE = ['pending', 'confirmed']

// Members see their own bookings, admins see all of them,
// guests see the confirmed bookings of the rooms they were invited to.
router.get('/', allow('admin', 'member', 'guest'), async (req, res) => {
  res.json(await Booking.visibleTo(req.user))
})

router.post('/', allow('admin', 'member'), async (req, res) => {
  const { roomId, startsAt, endsAt } = req.body
  const room = await Room.findById(roomId)
  if (!room) return res.status(404).json({ error: 'roomNotFound' })

  const active = await Booking.count({ ownerId: req.user.id, status: ACTIVE })
  if (active >= MAX_ACTIVE_BOOKINGS) return res.status(403).json({ error: 'limitReached', max: MAX_ACTIVE_BOOKINGS })

  const clash = await Booking.findOverlapping(roomId, startsAt, endsAt, ACTIVE)
  if (clash) return res.status(409).json({ error: 'slotTaken' })

  res.status(201).json(await Booking.create({ ownerId: req.user.id, roomId, startsAt, endsAt, status: 'draft' }))
})

// draft -> pending: from here an admin has 24 hours to confirm
router.post('/:id/submit', allow('admin', 'member'), async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  if (!booking) return res.status(404).json({ error: 'bookingNotFound' })
  if (booking.ownerId !== req.user.id) return res.status(403).json({ error: 'notOwner' })
  if (booking.status !== 'draft') return res.status(409).json({ error: 'notDraft' })
  res.json(await booking.update({ status: 'pending', submittedAt: new Date() }))
})

// pending -> confirmed
router.post('/:id/confirm', allow('admin'), async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  if (!booking) return res.status(404).json({ error: 'bookingNotFound' })
  if (booking.status !== 'pending') return res.status(409).json({ error: 'notPending' })
  await booking.update({ status: 'confirmed' })
  await notify(booking.ownerId, 'bookingConfirmed', { bookingId: booking.id })
  res.json(booking)
})

// any state -> cancelled, by the owner or by an admin
router.delete('/:id', allow('admin', 'member'), async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  if (!booking) return res.status(404).json({ error: 'bookingNotFound' })
  const byAdmin = req.user.role === 'admin' && booking.ownerId !== req.user.id
  if (!byAdmin && booking.ownerId !== req.user.id) return res.status(403).json({ error: 'notOwner' })
  await booking.update({ status: 'cancelled' })
  if (byAdmin) await notify(booking.ownerId, 'bookingCancelledByAdmin', { bookingId: booking.id })
  res.status(204).end()
})

export default router
