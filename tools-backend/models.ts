const environment = {
  dev: 'dev',
  staging: 'staging',
  production: 'production',
} as const

export type IEnvironment = keyof typeof environment

export interface IEnvironmentObject {
  environment: IEnvironment
}