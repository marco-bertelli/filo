// Sends an email and an in-app notice to a user. `key` picks the text (web/i18n: notice.<key>).
export async function notify (userId, key, data = {}) {
  await queue.add('notice', { userId, key, data })
}
