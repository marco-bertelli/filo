import { bookingsPage } from './pages/bookings.js'
import { newBookingPage } from './pages/new-booking.js'

export const routes = [
  { path: '/bookings', page: bookingsPage, roles: ['admin', 'member'] },
  { path: '/bookings/new', page: newBookingPage, roles: ['admin', 'member'] }
]

// A signed-in user whose role has no page for the path is sent to /sign-in.
export function guard (route, user) {
  return route.roles.includes(user.role) ? route.page : '/sign-in'
}
