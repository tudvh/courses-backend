import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

import { AdminUser } from '../entities'

export default class AdminUserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const adminUserRepository = dataSource.getRepository(AdminUser)

    await adminUserRepository.save({
      firstName: 'Admin',
      lastName: 'Nguyễn',
      email: 'admin@example.com',
      password: 'password',
    })
  }
}
