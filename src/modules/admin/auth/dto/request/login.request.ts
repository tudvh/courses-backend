import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
    format: 'email',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  password: string
}
