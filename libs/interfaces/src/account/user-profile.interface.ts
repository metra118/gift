import { IUser } from './user.interface'

export type IUserProfile = Omit<IUser, 'passwordHash'>
