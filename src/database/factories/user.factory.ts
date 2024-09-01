import { fakerVI } from '@faker-js/faker'
import { format } from 'date-fns'
import { setSeederFactory } from 'typeorm-extension'

import { DATE_FORMAT } from '@/common/constants'
import { User } from '../entities/user.entity'

export default setSeederFactory(User, async () => {
  const user = new User()
  const genderType = fakerVI.person.sexType()
  const createdAt = format(fakerVI.date.past(), DATE_FORMAT.DATE_DASH)

  user.firstName = fakerVI.person.firstName(genderType)
  user.lastName = fakerVI.person.lastName(genderType)
  user.dob = format(fakerVI.date.birthdate(), DATE_FORMAT.DATE_DASH)
  user.gender = genderType === 'male' ? 1 : 2
  user.phoneNumber = `0${fakerVI.number.int({ min: 100000000, max: 999999999 })}`
  user.email = fakerVI.internet.email()
  user.password = 'password'
  user.isActive = fakerVI.number.int({ min: 1, max: 3 }) === 1 ? false : true
  user.createdAt = createdAt
  user.updatedAt = createdAt

  return user
})
