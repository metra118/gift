import { IsString } from 'class-validator'

export class AuthLogoutCookieDto {
  @IsString()
  refreshToken: string
}

