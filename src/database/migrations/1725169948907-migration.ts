import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1725169948907 implements MigrationInterface {
  name = 'Migration1725169948907'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`RENAME TABLE \`admin_user\` TO \`admin_users\``)
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(6) NULL, \`id\` varchar(36) NOT NULL, \`first_name\` varchar(20) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`dob\` varchar(20) NOT NULL, \`gender\` tinyint NOT NULL DEFAULT '1', \`phone_number\` varchar(20) NOT NULL, \`avatar_url\` varchar(255) NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``)
    await queryRunner.query(`RENAME TABLE \`admin_users\` TO \`admin_user\``)
  }
}
