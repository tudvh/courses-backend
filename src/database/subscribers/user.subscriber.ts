import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm'

import { BcryptUtil } from '@/common/utils'
import { User } from '../entities/user.entity'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    const entity = event.entity
    if (entity.password) {
      entity.password = await BcryptUtil.generateHash(entity.password)
    }
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    const entity = event.entity
    if (entity.password) {
      entity.password = await BcryptUtil.generateHash(entity.password)
    }
  }
}
