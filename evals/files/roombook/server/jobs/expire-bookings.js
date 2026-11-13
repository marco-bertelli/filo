import { Booking } from '../db.js'

// Runs every 10 minutes. A pending booking that no admin confirmed within 24 hours
// is expired, and its slot is free again.
export async function expireBookings (now = new Date()) {
  const limit = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  await Booking.updateMany({ status: 'pending', submittedAt: { $lt: limit } }, { status: 'expired' })
}
