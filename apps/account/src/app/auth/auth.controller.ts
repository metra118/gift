import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  AccountLoginRequest,
  AccountLoginResponse,
  accountLoginKey,
  AccountLogoutRequest,
  AccountLogoutResponse,
  accountLogoutKey,
  AccountRefreshRequest,
  AccountRefreshResponse,
  accountRefreshKey,
  AccountRegisterRequest,
  AccountRegisterResponse,
  accountRegisterKey, ResponceStatuses,
} from '@gift/contracts'
import { AuthService } from './auth.service'
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { ReplyErrorCallback } from '../reply.error.callback'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RabbitRPC({
    routingKey: accountRegisterKey,
    queue: 'accountRegisterKey',
    exchange: 'gift',
    errorHandler: ReplyErrorCallback,
  })
  async register(
    @RabbitPayload() data: AccountRegisterRequest,
  ): Promise<AccountRegisterResponse> {
    console.log('register')

    return this.authService.register(data)
  }

  // @RMQValidate()
  // @RMQRoute(accountLoginKey)
  // login(data: AccountLoginRequest): Promise<AccountLoginResponse> {
  //   return this.authService.login(data)
  // }
  //
  // @RMQValidate()
  // @RMQRoute(accountLogoutKey)
  // logout(data: AccountLogoutRequest): Promise<AccountLogoutResponse> {
  //   return this.authService.logout(data)
  // }
  //

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: accountRefreshKey,
    queue: 'accountRegisterKey',
    exchange: 'gift',
  })
  async refresh(
    @RabbitPayload() data: AccountRefreshRequest,
  ): Promise<AccountRefreshResponse> {
    console.log('refresh')
    return {
      status: ResponceStatuses.success,
      data: {
        accessToken: 'awd',
        refreshToken: 'awd',
      },
    }
  }
}
