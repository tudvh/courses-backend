import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from './base.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 20, name: 'first_name' })
  firstName: string

  @Column({ type: 'varchar', length: 50, name: 'last_name' })
  lastName: string

  @Column({ type: 'varchar', length: 20, name: 'dob' })
  dob: string

  @Column({ type: 'tinyint', default: 1, name: 'gender' })
  gender: number

  @Column({ type: 'varchar', length: 20, name: 'phone_number' })
  phoneNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'avatar_url' })
  avatarUrl: string

  @Column({ type: 'varchar', length: 100, name: 'email' })
  email: string

  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean
}
