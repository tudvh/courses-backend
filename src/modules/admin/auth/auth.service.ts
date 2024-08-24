import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'

import { AdminUser } from '@/common/entities'
import { BcryptUtil } from '@/common/utils'
import { LoginRequest } from './dto/request'
import { LoginResponse, ProfileResponse } from './dto/response'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(AdminUser) private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const { email, password } = loginRequest

    const adminUser = await this.adminUserRepository.findOneBy({ email })

    if (!adminUser) {
      throw new BadRequestException('Invalid email or password')
    }

    const isMatch = await BcryptUtil.validateHashPassword(password, adminUser.password)

    if (!isMatch) {
      throw new BadRequestException('Invalid email or password')
    }

    return {
      accessToken: this.jwtService.sign({ userId: adminUser.id }),
      expiresIn: parseInt(this.configService.get('JWT_ADMIN_EXPIRATION_TIME')),
      user: plainToInstance(ProfileResponse, adminUser, {
        excludeExtraneousValues: true,
      }),
    }
  }

  public async getProfile(adminUser: AdminUser): Promise<ProfileResponse> {
    return plainToInstance(ProfileResponse, adminUser, {
      excludeExtraneousValues: true,
    })
  }
}
