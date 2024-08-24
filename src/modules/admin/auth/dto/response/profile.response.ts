import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ProfileResponse {
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
  email: string
}
