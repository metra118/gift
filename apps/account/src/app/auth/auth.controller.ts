import { Controller } from '@nestjs/common'
import { RMQRoute, RMQValidate } from 'nestjs-rmq'
import {
  AccountRegisterRequest,
  AccountRegisterResponse,
  accountRegisterTopic,
} from '@gift/contracts'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RMQValidate()
  @RMQRoute(accountRegisterTopic)
  register(data: AccountRegisterRequest): Promise<AccountRegisterResponse> {
    return this.authService.register(data)
  }
}
