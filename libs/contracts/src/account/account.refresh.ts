import { IsDefined, IsString, ValidateNested } from 'class-validator'
import { IUserInToken } from '@gift/interfaces'
import { Type } from 'class-transformer'
import { ResponseError } from '../common/response-error'
import { ResponseSuccess } from '../common/response-success'

export const accountRefreshKey = 'account.refresh.command'

export class UserInToken implements IUserInToken {
  @IsString()
  userId: string
}

export class AccountRefreshRequest {
  @IsString()
  refreshToken: string

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserInToken)
  user: UserInToken
}

class AccountRefreshResponseSuccess extends ResponseSuccess {
  data: {
    accessToken: string
    refreshToken: string
  }
}
export type AccountRefreshResponse =
  | AccountRefreshResponseSuccess
  | ResponseError
