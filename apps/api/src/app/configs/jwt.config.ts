import { JwtModuleAsyncOptions } from '@nestjs/jwt'

export const getJWTConfig = (): JwtModuleAsyncOptions => ({
  imports: [],
  inject: [],
  useFactory: () => ({}),
})
