import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from './base.entity'

@Entity({ name: 'admin_users' })
export class AdminUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 20, name: 'first_name' })
  firstName: string

  @Column({ type: 'varchar', length: 50, name: 'last_name' })
  lastName: string

  @Column({ type: 'varchar', length: 100, name: 'email' })
  email: string

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string
}
