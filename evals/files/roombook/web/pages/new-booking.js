import { t } from '../i18n.js'
import { api } from '../api.js'
import { go, showError } from '../ui.js'

export function newBookingPage (rooms) {
  return `<h1>${t('newBooking.title')}</h1>
    <form id="new-booking">
      <label>${t('newBooking.room')} <select name="room">${rooms.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}</select></label>
      <label>${t('newBooking.start')} <input name="start" type="datetime-local" required></label>
      <label>${t('newBooking.end')} <input name="end" type="datetime-local" required></label>
      <button>${t('newBooking.save')}</button>
    </form>`
}

export async function submitNewBooking (form) {
  const res = await api.post('/bookings', { roomId: form.room.value, startsAt: form.start.value, endsAt: form.end.value })
  if (res.ok) return go('/bookings')
  if (res.error === 'roomNotFound') return showError(t('error.roomNotFound'))
  showError(t('error.generic'))
}
