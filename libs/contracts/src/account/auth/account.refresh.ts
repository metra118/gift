import { IsDefined, IsString, ValidateNested } from 'class-validator'
import { ITokens, IUserInToken } from '@gift/interfaces'
import { Type } from 'class-transformer'
import { ResponseError } from '../../common/response/response-error'
import { ResponseSuccess } from '../../common/response/response-success'

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
  payload: ITokens
}
export type AccountRefreshResponse =
  | AccountRefreshResponseSuccess
  | ResponseError
