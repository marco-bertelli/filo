export const BOOKING_STATUSES = ['draft', 'pending', 'confirmed', 'cancelled', 'expired']

// A member can hold at most this many pending + confirmed bookings at once.
export const MAX_ACTIVE_BOOKINGS = 3

export const bookingSchema = {
  ownerId: { type: 'id', ref: 'User', required: true },
  roomId: { type: 'id', ref: 'Room', required: true },
  startsAt: { type: Date, required: true },
  endsAt: { type: Date, required: true },
  status: { type: String, enum: BOOKING_STATUSES, default: 'draft' },
  // set when the booking is sent for confirmation
  submittedAt: { type: Date, default: null }
}
