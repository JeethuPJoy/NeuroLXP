import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilingModule } from './modules/profiling/profiling.module';
import { UserProfile } from './modules/profiling/entities/user-profile.entity';

@Module({
  imports: [
    // Load .env
    ConfigModule.forRoot({ isGlobal: true }),

    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_NAME', 'neurolxp'),
        entities: [UserProfile],
        synchronize: true, // auto-creates tables — disable in production
        logging: false,
      }),
    }),

    ProfilingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
