import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { RMQService } from 'nestjs-rmq'
import { FastifyReply } from 'fastify'
import {
  AccountLoginRequest,
  AccountLoginResponse,
  accountLoginTopic,
  AccountLogoutRequest,
  AccountLogoutResponse,
  accountLogoutTopic,
  AccountRefreshRequest,
  AccountRefreshResponse,
  AccountRegisterRequest,
  AccountRegisterResponse,
  accountRegisterTopic,
} from '@gift/contracts'
import { Cookies } from '../decorator/cookie'
import { AuthLogoutCookieDto } from '../dtos/auth.logout-cookie.dto'
import { ConfigService } from '@nestjs/config'
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard'

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly rmqService: RMQService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/register')
  async register(
    @Body(ValidationPipe) body: AccountRegisterRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<AccountRegisterResponse | unknown> {
    try {
      const res = await this.rmqService.send<
        AccountRegisterRequest,
        AccountRegisterResponse
      >(accountRegisterTopic, body)
      reply.setCookie(
        this.configService.getOrThrow('REFRESH_TOKEN_COOKIE_NAME'),
        res.refreshToken,
        {
          httpOnly: true,
          maxAge: Number(
            this.configService.getOrThrow('REFRESH_TOKEN_COOKIE_MAX_AGE'),
          ),
        },
      )
      return res
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message)
      }
    }
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) body: AccountLoginRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<AccountLoginResponse | unknown> {
    try {
      const res = await this.rmqService.send<
        AccountLoginRequest,
        AccountLoginResponse
      >(accountLoginTopic, body)
      reply.setCookie(
        this.configService.getOrThrow('REFRESH_TOKEN_COOKIE_NAME'),
        res.refreshToken,
        {
          httpOnly: true,
          maxAge: Number(
            this.configService.getOrThrow('REFRESH_TOKEN_COOKIE_MAX_AGE'),
          ),
        },
      )
      return res
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message)
      }
    }
  }

  @Post('/logout')
  async logout(
    @Cookies(new ValidationPipe({ validateCustomDecorators: true }))
    cookie: AuthLogoutCookieDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<AccountLogoutResponse | unknown> {
    try {
      const res = await this.rmqService.send<
        AccountLogoutRequest,
        AccountLogoutResponse
      >(accountLogoutTopic, cookie)
      reply.clearCookie(
        this.configService.getOrThrow('REFRESH_TOKEN_COOKIE_NAME'),
      )
      return res
    } catch (e) {
      console.error(e)
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  async refresh(
    @Cookies(new ValidationPipe({ validateCustomDecorators: true }))
    body: AccountRefreshRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<AccountRefreshResponse | unknown> {
    try {
      // const res = await this.rmqService.send<
      //   AccountRefreshRequest,
      //   AccountRefreshResponse
      // >(accountRefreshTopic, body)
      // reply.setCookie(
      //   this.configService.getOrThrow('REFRESH_TOKEN_COOKIE_NAME'),
      //   res.refreshToken,
      //   {
      //     httpOnly: true,
      //     maxAge: this.configService.getOrThrow('REFRESH_TOKEN_COOKIE_MAX_AGE'),
      //   },
      // )
      // return res
      return { awd: 232 }
    } catch (e) {
      console.error(e)
    }
  }
}
