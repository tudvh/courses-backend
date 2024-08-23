import { compare, genSalt, hash } from 'bcryptjs'

export class BcryptUtil {
  static async validateHashPassword(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) {
      return false
    }
    return await compare(password, hash)
  }

  static async generateHash(password: string): Promise<string> {
    const salt = await genSalt()
    return hash(password, salt)
  }
}
