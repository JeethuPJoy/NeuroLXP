import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { UpdateProfileValueDto } from '../dto/update-profile-value.dto';
import { calculateCompletion } from '../helpers/profile-completion.helper';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepo: Repository<UserProfile>,
  ) {}

  async getProfile(userId: string): Promise<UserProfile> {
    let profile = await this.profileRepo.findOne({ where: { userId } });

    if (!profile) {
      // Auto-create an empty profile on first access
      profile = this.profileRepo.create({ userId });
      profile = await this.profileRepo.save(profile);
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileValueDto,
  ): Promise<UserProfile> {
    let profile = await this.profileRepo.findOne({ where: { userId } });

    if (!profile) {
      profile = this.profileRepo.create({ userId, ...dto });
    } else {
      Object.assign(profile, dto);
    }

    profile.completionPercentage = calculateCompletion(profile);
    return this.profileRepo.save(profile);
  }
}
