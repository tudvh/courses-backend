import { Body, Controller, Get, HttpCode, HttpStatus, Put, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AdminAuth } from '@/common/decorators'
import { PaginateResponse } from '@/common/dto/response'
import { UpdateUserStatusRequest } from './dto/request'
import { GetUsersRequest } from './dto/request/get-users.request'
import { UserResponse } from './dto/response'
import { UserService } from './user.service'

@Controller('/admin/users')
@ApiTags('Admin User')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PaginateResponse<UserResponse> })
  @AdminAuth()
  async getUsers(
    @Query() getUsersRequest: GetUsersRequest,
  ): Promise<PaginateResponse<UserResponse>> {
    const data = await this.userService.getUsers(getUsersRequest)
    return data
  }

  @Put('/status')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @AdminAuth()
  async updateUserStatus(@Body() updateUserStatusRequest: UpdateUserStatusRequest): Promise<void> {
    await this.userService.updateUserStatus(updateUserStatusRequest)
  }
}
