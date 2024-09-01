import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UserResponse {
  @Expose()
  @ApiProperty()
  id: number

  @Expose()
  @ApiProperty()
  firstName: string

  @Expose()
  @ApiProperty()
  lastName: string

  @Expose()
  @ApiProperty()
  dob: string

  @Expose()
  @ApiProperty()
  gender: number

  @Expose()
  @ApiProperty()
  phoneNumber: string

  @Expose()
  @ApiProperty()
  avatarUrl: string

  @Expose()
  @ApiProperty()
  email: string

  @Expose()
  @ApiProperty()
  isActive: boolean
}
