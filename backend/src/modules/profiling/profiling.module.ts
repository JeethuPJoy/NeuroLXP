import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { UserProfileController } from './controllers/user-profile.controller';
import { UserProfileService } from './services/user-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class ProfilingModule {}
