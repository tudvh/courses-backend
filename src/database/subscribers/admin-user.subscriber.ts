import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm'

import { BcryptUtil } from '@/common/utils'
import { AdminUser } from '../entities'

@EventSubscriber()
export class AdminUserSubscriber implements EntitySubscriberInterface<AdminUser> {
  listenTo() {
    return AdminUser
  }

  async beforeInsert(event: InsertEvent<AdminUser>): Promise<void> {
    const entity = event.entity
    if (entity.password) {
      entity.password = await BcryptUtil.generateHash(entity.password)
    }
  }

  async beforeUpdate(event: UpdateEvent<AdminUser>): Promise<void> {
    const entity = event.entity
    if (entity.password) {
      entity.password = await BcryptUtil.generateHash(entity.password)
    }
  }
}
