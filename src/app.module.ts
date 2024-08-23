import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { DatabaseModule } from './database/database.module'
import { AdminModule } from './modules/admin/admin.module'
import { ClientModule } from './modules/client/client.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join('public'),
      serveRoot: '/',
    }),
    DatabaseModule,
    AdminModule,
    ClientModule,
  ],
})
export class AppModule {}
