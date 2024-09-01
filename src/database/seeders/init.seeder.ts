import { DataSource } from 'typeorm'
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension'

import { UserFactory } from '../factories'
import AdminUserSeeder from './admin-user.seeder'
import UserSeeder from './user.seeder'

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [AdminUserSeeder, UserSeeder],
      factories: [UserFactory],
    })
  }
}
