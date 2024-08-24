import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { AdminAuthGuard } from '../guards'

export function AdminAuth(): MethodDecorator {
  return applyDecorators(
    UseGuards(AdminAuthGuard()),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized ' }),
  )
}
