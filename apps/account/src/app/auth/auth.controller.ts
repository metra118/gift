import { Controller } from '@nestjs/common'
import { RMQRoute, RMQValidate } from 'nestjs-rmq'
import {
  AccountLoginRequest,
  AccountLoginResponse,
  accountLoginTopic,
  AccountLogoutRequest,
  AccountLogoutResponse,
  accountLogoutTopic,
  AccountRefreshRequest,
  AccountRefreshResponse,
  accountRefreshTopic,
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

  @RMQValidate()
  @RMQRoute(accountLoginTopic)
  login(data: AccountLoginRequest): Promise<AccountLoginResponse> {
    return this.authService.login(data)
  }

  @RMQValidate()
  @RMQRoute(accountLogoutTopic)
  logout(data: AccountLogoutRequest): Promise<AccountLogoutResponse> {
    return this.authService.logout(data)
  }

  @RMQValidate()
  @RMQRoute(accountRefreshTopic)
  refresh(data: AccountRefreshRequest): Promise<AccountRefreshResponse> {
    return this.authService.refresh(data)
  }
}
