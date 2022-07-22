import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { ResponseError } from '../../common/response/response-error'
import { ResponseSuccess } from '../../common/response/response-success'
import { IUserProfile } from '@gift/interfaces'

export const accountUpdateUserProfileTopic = 'account.update-user-profile.query'

export class AccountUpdateUserProfileRequest implements IUserProfile {
  @IsString()
  userId: string

  @IsString()
  email: string

  @IsBoolean()
  isActive: boolean

  @IsOptional()
  @IsString()
  firstName: string | null

  @IsOptional()
  @IsString()
  lastName: string | null

  @IsOptional()
  @IsString()
  nickname: string | null

  @IsOptional()
  @IsString()
  bio: string | null
}

class AccountUpdateUserProfileResponseSuccess extends ResponseSuccess {
  payload: IUserProfile
}

export type AccountUpdateUserProfileResponse =
  | AccountUpdateUserProfileResponseSuccess
  | ResponseError
