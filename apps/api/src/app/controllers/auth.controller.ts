import {
  Body,
  Controller,
  Delete,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common'
import { RMQService } from 'nestjs-rmq'
import { FastifyReply } from 'fastify'
import {
  AccountLoginRequest,
  AccountLoginResponse,
  accountLoginTopic,
  AccountLogoutRequest,
  accountLogoutTopic,
  AccountRegisterRequest,
  AccountRegisterResponse,
  accountRegisterTopic,
} from '@gift/contracts'
import { Cookies } from '../decorator/cookie'
import { AuthLogoutCookieDto } from '../dtos/auth.logout-cookie.dto'
import {
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../configs/constants'

@Controller('/auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('/register')
  async register(
    @Body(ValidationPipe) body: AccountRegisterRequest,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<AccountRegisterResponse | undefined> {
    try {
      const res = await this.rmqService.send<
        AccountRegisterRequest,
        AccountRegisterResponse
      >(accountRegisterTopic, body)
      reply.setCookie(REFRESH_TOKEN_COOKIE_NAME, res.refreshToken, {
        httpOnly: true,
        maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
      })
      return res
    } catch (e) {
      console.error(e)
    }
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) body: AccountLoginRequest,
    @Res() reply: FastifyReply,
  ): Promise<AccountLoginResponse | undefined> {
    try {
      const res = await this.rmqService.send<
        AccountLoginRequest,
        AccountLoginResponse
      >(accountLoginTopic, body)
      reply.setCookie(REFRESH_TOKEN_COOKIE_NAME, res.refreshToken, {
        httpOnly: true,
        maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
      })
      return res
    } catch (e) {
      console.error(e)
    }
  }

  @Delete('/logout')
  async logout(
    @Cookies(new ValidationPipe({ validateCustomDecorators: true }))
    cookie: AuthLogoutCookieDto,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    try {
      await this.rmqService.send<AccountLogoutRequest, undefined>(
        accountLogoutTopic,
        cookie,
      )
      reply.clearCookie(REFRESH_TOKEN_COOKIE_NAME)
    } catch (e) {
      console.error(e)
    }
  }

  @Post('/refresh')
  async refresh(
    @Body(ValidationPipe) body: AccountRegisterRequest,
    @Res() reply: FastifyReply,
  ): Promise<AccountRegisterResponse | undefined> {
    try {
      const res = await this.rmqService.send<
        AccountRegisterRequest,
        AccountRegisterResponse
      >(accountRegisterTopic, body)
      reply.setCookie(REFRESH_TOKEN_COOKIE_NAME, res.refreshToken, {
        httpOnly: true,
        maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
      })
      return res
    } catch (e) {
      console.error(e)
    }
  }
}
