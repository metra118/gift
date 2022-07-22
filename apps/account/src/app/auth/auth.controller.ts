import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  accountLoginKey,
  AccountLoginRequest,
  AccountLoginResponse,
  accountLogoutAllKey,
  AccountLogoutAllRequest,
  AccountLogoutAllResponse,
  accountLogoutKey,
  AccountLogoutRequest,
  AccountLogoutResponse,
  accountRefreshKey,
  AccountRefreshRequest,
  AccountRefreshResponse,
  accountRegisterKey,
  AccountRegisterRequest,
  AccountRegisterResponse,
  accountRemoveDeadTokensKey,
  AccountRemoveDeadTokensResponse,
  ResponseStatuses,
} from '@gift/contracts'
import { AuthService } from './services/auth.service'
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { replyErrorHandler } from '@gift/common'

@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: accountRegisterKey,
    queue: accountRegisterKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async register(
    @RabbitPayload() payloadReq: AccountRegisterRequest,
  ): Promise<AccountRegisterResponse> {
    const payload = await this.authService.register(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }

  @RabbitRPC({
    routingKey: accountRemoveDeadTokensKey,
    queue: accountRemoveDeadTokensKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async removeDeadTokens(): Promise<AccountRemoveDeadTokensResponse> {
    const payload = await this.authService.removeDeadTokens()
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: accountLoginKey,
    queue: accountLoginKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async login(
    @RabbitPayload() payloadReq: AccountLoginRequest,
  ): Promise<AccountLoginResponse> {
    const payload = await this.authService.login(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: accountLogoutKey,
    queue: accountLogoutKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async logout(
    @RabbitPayload() payloadReq: AccountLogoutRequest,
  ): Promise<AccountLogoutResponse> {
    const payload = await this.authService.logout(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: accountLogoutAllKey,
    queue: accountLogoutAllKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async logoutAll(
    @RabbitPayload() payloadReq: AccountLogoutAllRequest,
  ): Promise<AccountLogoutAllResponse> {
    const payload = await this.authService.logoutAll(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }

  @UsePipes(ValidationPipe)
  @RabbitRPC({
    routingKey: accountRefreshKey,
    queue: accountRefreshKey,
    exchange: process.env.AMQP_EXCHANGE,
    errorHandler: replyErrorHandler,
  })
  async refresh(
    @RabbitPayload() payloadReq: AccountRefreshRequest,
  ): Promise<AccountRefreshResponse> {
    const payload = await this.authService.refresh(payloadReq)
    return {
      payload,
      status: ResponseStatuses.success,
    }
  }
}
