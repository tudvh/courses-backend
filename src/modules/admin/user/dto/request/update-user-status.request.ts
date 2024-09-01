import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsUUID } from 'class-validator'

export class UpdateUserStatusRequest {
  @IsString()
  @IsUUID()
  @ApiProperty({ required: true })
  userId: string

  @IsBoolean()
  @ApiProperty({ required: true })
  isActive: boolean
}
