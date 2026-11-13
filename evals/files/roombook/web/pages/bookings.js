import { t } from '../i18n.js'
import { api } from '../api.js'
import { currentUser, formatSlot } from '../ui.js'

const BADGE_COLOUR = { draft: 'grey', pending: 'amber', confirmed: 'green', cancelled: 'red' }

export async function bookingsPage () {
  const bookings = await api.get('/bookings')
  if (!bookings.length) return `<h1>${t('bookings.title')}</h1><p class="empty">${t('bookings.empty')}</p>`
  return `<h1>${t('bookings.title')}</h1>
    <a href="/bookings/new">${t('bookings.new')}</a>
    <ul class="bookings">${bookings.map(row).join('')}</ul>`
}

function row (b) {
  const admin = currentUser().role === 'admin'
  return `<li>
    <span>${b.room.name} · ${formatSlot(b)}</span>
    <span class="badge ${BADGE_COLOUR[b.status] || ''}">${t('status.' + b.status)}</span>
    ${b.status === 'draft' ? `<button data-submit="${b.id}">${t('bookings.submit')}</button>` : ''}
    ${admin && b.status === 'pending' ? `<button data-confirm="${b.id}">${t('bookings.confirm')}</button>` : ''}
    ${['draft', 'pending', 'confirmed'].includes(b.status) ? `<button data-cancel="${b.id}">${t('bookings.cancel')}</button>` : ''}
  </li>`
}
