export const backendUrl = 'http://localhost:1000'

const routes = {
  decrypt: '/decrypt',
  encrypt: '/encrypt',
  oneWayEncrypt: '/one-way-encrypt',
} as const

export type Route = valueof<typeof routes>

type valueof<T> = T[keyof T]