import { AuthGuard, IAuthGuard, Type } from '@nestjs/passport'

export function AdminAuthGuard(): Type<IAuthGuard> {
  const strategies = ['admin-jwt']

  return AuthGuard(strategies)
}
