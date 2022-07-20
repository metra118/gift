import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PasswordService {
  private scryptAsync

  constructor() {
    this.scryptAsync = promisify(scrypt)
  }

  async toHash(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex')
    const buf = (await this.scryptAsync(password, salt, 64)) as Buffer
    return `${buf.toString('hex')}.${salt}`
  }

  async compare(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.')
    const buf = (await this.scryptAsync(suppliedPassword, salt, 64)) as Buffer
    return buf.toString('hex') === hashedPassword
  }
}
