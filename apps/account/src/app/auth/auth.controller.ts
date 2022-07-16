import { Controller } from '@nestjs/common'
import { RMQRoute, RMQValidate } from 'nestjs-rmq'
import {
  AccountRegisterRequest,
  AccountRegisterResponse,
  accountRegisterTopic,
} from '@gift/contracts'

@Controller()
export class AuthController {
  @RMQValidate()
  @RMQRoute(accountRegisterTopic)
  getUser(data: AccountRegisterRequest): AccountRegisterResponse {
    return { accessToken: 'awd', refreshToken: '23' }
  }
}
