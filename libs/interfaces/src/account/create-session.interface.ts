import { ISession } from './session.interface'

export type ICreateSession = Pick<
  ISession,
  'accessToken' | 'refreshToken' | 'userId'
>
