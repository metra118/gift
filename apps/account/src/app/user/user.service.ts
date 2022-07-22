import { BadRequestException, Injectable } from '@nestjs/common'
import { IUserProfile } from '@gift/interfaces'
import { UserRepository } from './user.repository'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserProfileById(userId: string): Promise<IUserProfile> {
    const user = await this.userRepository.findUserById(userId)
    if (!user) throw new BadRequestException('Пользователь не найден')
    const userEntity = new UserEntity(user)
    return userEntity.getUserProfile()
  }
}
