import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { ProfileResponse } from './profile.response'

export class LoginResponse {
  @Expose()
  @ApiProperty()
  accessToken: string

  @Expose()
  @ApiProperty()
  expiresIn: number

  @Expose()
  @ApiProperty()
  user: ProfileResponse
}
