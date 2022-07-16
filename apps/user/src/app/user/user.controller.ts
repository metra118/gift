import { Controller } from '@nestjs/common'
import { RMQRoute, RMQValidate } from 'nestjs-rmq'
import {
  UserGetUserRequest,
  UserGetUserResponse,
  userGetUserTopic,
} from '@gift/contracts'

@Controller()
export class UserController {
  @RMQValidate()
  @RMQRoute(userGetUserTopic)
  getUser(data: UserGetUserRequest): UserGetUserResponse {
    return { name: 'test' }
  }
}
