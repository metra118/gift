interface ISession {
  sessionId: string
  accessToken: string
  refreshToken: string
  userId: string
}

interface IUser {
  userId?: string
  email: string
  passwordHash: string
}

declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<T>

export { ISession, IUser, PartialBy }
