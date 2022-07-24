import { IsString } from 'class-validator'
import { ResponseError } from '../../common/response/response-error'
import { ResponseSuccess } from '../../common/response/response-success'
import { IUserProfile } from '@gift/interfaces'

export const accountGetUserProfileKey = 'account.get-user-profile.query'

export class AccountGetUserProfileRequest {
  @IsString()
  userId: string
}

class AccountGetUserProfileResponseSuccess extends ResponseSuccess {
  payload: IUserProfile
}

export type AccountGetUserProfileResponse =
  | AccountGetUserProfileResponseSuccess
  | ResponseError
