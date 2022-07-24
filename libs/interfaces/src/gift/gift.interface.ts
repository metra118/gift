import { IGift } from './create-gift.interface'

export type ICreateGift = Omit<IGift, 'giftId'>
