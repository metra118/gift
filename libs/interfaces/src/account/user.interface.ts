export interface IUser {
  userId: string
  email: string
  passwordHash: string
  isActive: boolean
  firstName: string | null
  lastName: string | null
  nickname: string | null
  bio: string | null
}
