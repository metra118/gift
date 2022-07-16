import { Controller } from '@nestjs/common'
import { RMQRoute, RMQValidate } from 'nestjs-rmq'
import {
  UserRegisterRequest,
  UserRegisterResponse,
  userRegisterTopic,
} from '@gift/contracts'

@Controller()
export class AuthController {
  @RMQValidate()
  @RMQRoute(userRegisterTopic)
  getUser(data: UserRegisterRequest): UserRegisterResponse {
    return { accessToken: 'awd', refreshToken: '23' }
  }
}
