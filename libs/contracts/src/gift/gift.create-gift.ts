import { ICreateGift, IGift } from '@gift/interfaces'
import { IsString, MaxLength } from 'class-validator'
import { ResponseError } from '../common/response/response-error'
import { ResponseSuccess } from '../common/response/response-success'

export const giftCreateGiftKey = 'gift.create-gift.command'

export class GiftCreateGiftRequest implements ICreateGift {
  @IsString()
  userId: string

  @MaxLength(12)
  @IsString()
  title: string

  @MaxLength(280)
  @IsString()
  text: string
}

class GiftCreateGiftResponseSuccess extends ResponseSuccess {
  payload: IGift
}

export type GiftCreateGiftResponse =
  | GiftCreateGiftResponseSuccess
  | ResponseError
