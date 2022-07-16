import { IsEmail, IsString, Min } from 'class-validator'

export const userRegisterTopic = 'user.get-user.command'

export class UserRegisterRequest {
  @IsEmail()
  email: string

  @IsString()
  @Min(8)
  password: string
}

export class UserRegisterResponse {
  accessToken: string
  refreshToken: string
}
