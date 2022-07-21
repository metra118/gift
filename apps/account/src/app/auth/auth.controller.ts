import {
  Controller,
  Injectable,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
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
  ResponseStatuses,
} from '@gift/contracts'
import { AuthService } from './auth.service'
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
    @RabbitPayload() payload: AccountRegisterRequest,
  ): Promise<AccountRegisterResponse> {
    const data = await this.authService.register(payload)
    return {
      data,
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
    @RabbitPayload() payload: AccountLoginRequest,
  ): Promise<AccountLoginResponse> {
    const data = await this.authService.login(payload)
    return {
      data,
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
    @RabbitPayload() payload: AccountLogoutRequest,
  ): Promise<AccountLogoutResponse> {
    const data = await this.authService.logout(payload)
    return {
      data,
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
    @RabbitPayload() payload: AccountLogoutAllRequest,
  ): Promise<AccountLogoutAllResponse> {
    const data = await this.authService.logoutAll(payload)
    return {
      data,
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
    @RabbitPayload() payload: AccountRefreshRequest,
  ): Promise<AccountRefreshResponse> {
    const data = await this.authService.refresh(payload)
    return {
      data,
      status: ResponseStatuses.success,
    }
  }
}
