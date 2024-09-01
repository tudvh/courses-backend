import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'

import { AdminUser } from '@/database/entities'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    configService: ConfigService,
    @InjectRepository(AdminUser) private readonly adminUserRepository: Repository<AdminUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreElements: false,
      secretOrKey: configService.get('JWT_ADMIN_SECRET'),
    })
  }

  async validate(args: { userId: string }): Promise<AdminUser> {
    const adminUser = await this.adminUserRepository.findOneBy({ id: args.userId })

    if (!adminUser) {
      throw new UnauthorizedException('Unauthorized')
    }

    return adminUser
  }
}
