import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Brackets, Not, Repository } from 'typeorm'

import { DEFAULT_PAGINATION } from '@/common/constants'
import { PaginateMeta, PaginateResponse } from '@/common/dto/response'
import { User } from '@/database/entities/user.entity'
import { GetUsersRequest, UpdateUserStatusRequest } from './dto/request'
import { UserResponse } from './dto/response'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async getUsers(getUsersRequest: GetUsersRequest): Promise<PaginateResponse<UserResponse>> {
    const currentPage = getUsersRequest.page || DEFAULT_PAGINATION.CURRENT_PAGE
    const perPage = getUsersRequest.perPage || DEFAULT_PAGINATION.LIMIT
    const { q, isActive } = getUsersRequest
    const skip = (currentPage - 1) * perPage

    const queryBuilder = this.userRepository.createQueryBuilder('users')
    if (q) {
      queryBuilder.where(
        new Brackets(qb => {
          qb.where('users.firstName LIKE :q', { q: `%${q}%` })
            .orWhere('users.lastName LIKE :q', { q: `%${q}%` })
            .orWhere('CONCAT(users.firstName, " ", users.lastName) LIKE :q', { q: `%${q}%` })
            .orWhere('users.email LIKE :q', { q: `%${q}%` })
        }),
      )
    }
    if (typeof isActive == 'boolean') {
      queryBuilder.andWhere('users.isActive = :isActive', { isActive })
    }

    const [users, total] = await queryBuilder
      .take(perPage)
      .skip(skip)
      .orderBy('users.createdAt', 'DESC')
      .getManyAndCount()

    return {
      data: plainToInstance(UserResponse, users, {
        excludeExtraneousValues: true,
      }),
      meta: new PaginateMeta(currentPage, perPage, total),
    }
  }

  public async updateUserStatus(updateUserStatusRequest: UpdateUserStatusRequest): Promise<void> {
    const { userId, isActive } = updateUserStatusRequest

    const user = await this.userRepository.findOneBy({
      id: userId,
      isActive: Not(isActive),
    })

    if (!user) {
      throw new BadRequestException('User not found')
    }

    await this.userRepository.update(user.id, {
      isActive: isActive,
    })
  }
}
