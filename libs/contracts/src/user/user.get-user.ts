import { IsNumber } from 'class-validator'

export const UserGetUserTopic = 'user.get-user.query'

export class UserGetUserRequest {
  @IsNumber()
  userId: number
}

export class UserGetUserResponse {
  name: string
}
