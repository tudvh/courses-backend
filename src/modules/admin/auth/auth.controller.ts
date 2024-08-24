import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AdminAuth } from '@/common/decorators'
import { AuthService } from './auth.service'
import { LoginRequest } from './dto/request'
import { LoginResponse, ProfileResponse } from './dto/response'

@Controller('/admin/auth')
@ApiTags('Admin Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponse })
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    const data = await this.authService.login(loginRequest)
    return data
  }

  @Post('/me')
  @AdminAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProfileResponse })
  async getProfile(@Req() request): Promise<ProfileResponse> {
    const data = await this.authService.getProfile(request.user)
    return data
  }
}
