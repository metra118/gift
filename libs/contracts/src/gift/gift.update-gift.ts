import { IGift } from '@gift/interfaces'
import { IsString, IsUUID, MaxLength } from 'class-validator'
import { ResponseError } from '../common/response/response-error'
import { ResponseSuccess } from '../common/response/response-success'

export const giftUpdateGiftKey = 'gift.update-gift.command'

export class GiftUpdateGiftRequest implements IGift {
  @IsUUID()
  giftId: string

  @IsString()
  userId: string

  @MaxLength(12)
  @IsString()
  title: string

  @MaxLength(280)
  @IsString()
  text: string
}

class GiftUpdateGiftResponseSuccess extends ResponseSuccess {
  payload: IGift
}

export type GiftUpdateGiftResponse =
  | GiftUpdateGiftResponseSuccess
  | ResponseError
