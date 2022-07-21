import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import ms from 'ms'
import { FastifyReply } from 'fastify'
import {
  accountLoginKey,
  AccountLoginRequest,
  AccountLoginResponse,
  accountLogoutAllKey,
  AccountLogoutAllResponse,
  accountLogoutKey,
  AccountLogoutRequest,
  AccountLogoutResponse,
  accountRefreshKey,
  AccountRefreshResponse,
  accountRegisterKey,
  AccountRegisterRequest,
  AccountRegisterResponse,
} from '@gift/contracts'
import { isError } from '@gift/common'
import { GetCookies } from '../decorator/get-cookies.decorator'
import { ConfigService } from '@nestjs/config'
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard'
import { GetUser } from '../decorator/get-user.decorator'
import { ILogout, ITokens, IUserInToken } from '@gift/interfaces'

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService,
  ) {}

  @Post('/register')
  async register(
    @Body(ValidationPipe) body: AccountRegisterRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<ITokens | undefined> {
    try {
      const res = await this.amqpConnection.request<AccountRegisterResponse>({
        exchange: this.configService.getOrThrow('AMQP_EXCHANGE'),
        routingKey: accountRegisterKey,
        payload: body,
      })

      if (isError(res)) {
        throw new HttpException(res.error, res.error.statusCode)
      }

      reply.setCookie('refreshToken', res.data.refreshToken, {
        httpOnly: true,
        maxAge: ms(
          this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN'),
        ),
      })
      return res.data
    } catch (e) {
      console.error(e)
      if (e instanceof HttpException) {
        throw e
      } else if (e instanceof Error) {
        throw new UnauthorizedException(e.message)
      }
    }
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) body: AccountLoginRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<ITokens | undefined> {
    try {
      const res = await this.amqpConnection.request<AccountLoginResponse>({
        exchange: this.configService.getOrThrow('AMQP_EXCHANGE'),
        routingKey: accountLoginKey,
        payload: body,
      })

      if (isError(res)) {
        throw new HttpException(res.error, res.error.statusCode)
      }

      reply.setCookie('refreshToken', res.data.refreshToken, {
        httpOnly: true,
        maxAge: ms(
          this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN'),
        ),
      })
      return res.data
    } catch (e) {
      console.error(e)
      if (e instanceof HttpException) {
        throw e
      } else if (e instanceof Error) {
        throw new UnauthorizedException(e.message)
      }
    }
  }

  @Post('/logout')
  async logout(
    @GetCookies(new ValidationPipe({ validateCustomDecorators: true }))
    cookie: AccountLogoutRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<ILogout | undefined> {
    try {
      const res = await this.amqpConnection.request<AccountLogoutResponse>({
        exchange: this.configService.getOrThrow('AMQP_EXCHANGE'),
        routingKey: accountLogoutKey,
        payload: cookie,
      })

      if (isError(res)) {
        return {
          isOk: false,
        }
      }

      reply.clearCookie('refreshToken')
      return res.data
    } catch (e) {
      console.error(e)
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/logout/all')
  async logoutAll(
    @GetUser() user: IUserInToken,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<ILogout | undefined> {
    try {
      const res = await this.amqpConnection.request<AccountLogoutAllResponse>({
        exchange: this.configService.getOrThrow('AMQP_EXCHANGE'),
        routingKey: accountLogoutAllKey,
        payload: user,
      })

      if (isError(res)) {
        return {
          isOk: false,
        }
      }

      reply.clearCookie('refreshToken')
      return res.data
    } catch (e) {
      console.error(e)
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  async refresh(
    @GetUser() user: IUserInToken,
    @GetCookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<ITokens | undefined> {
    try {
      const res = await this.amqpConnection.request<AccountRefreshResponse>({
        exchange: this.configService.getOrThrow('AMQP_EXCHANGE'),
        routingKey: accountRefreshKey,
        payload: {
          refreshToken,
          user,
        },
      })

      if (isError(res)) {
        throw new HttpException(res.error, res.error.statusCode)
      }

      reply.setCookie('refreshToken', res.data.refreshToken, {
        httpOnly: true,
        maxAge: ms(
          this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN'),
        ),
      })
      return res.data
    } catch (e) {
      console.error(e)
      if (e instanceof HttpException) {
        throw e
      } else if (e instanceof Error) {
        throw new UnauthorizedException(e.message)
      }
    }
  }
}
