import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest()
    if (!request.cookies?.accessToken) throw new UnauthorizedException()
    let user
    try {
      user = await this.jwtService.verifyAsync(request.cookies?.accessToken, {
        secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      })
    } catch (e) {
      console.log(123)
      throw new UnauthorizedException()
    }
    request.user = user
    return true
  }
}
