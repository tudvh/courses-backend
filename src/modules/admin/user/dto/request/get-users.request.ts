import { PaginateRequest } from '@/common/dto/request'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class GetUsersRequest extends PaginateRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  q: string

  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : null))
  isActive: boolean
}
