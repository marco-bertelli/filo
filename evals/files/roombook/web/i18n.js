import en from './i18n/en.json'

// A missing key shows as the key itself.
export const t = key => en[key] ?? key
