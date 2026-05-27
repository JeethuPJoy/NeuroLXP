import {
  Controller, Get, Patch, Param, Body,
} from '@nestjs/common';
import { UserProfileService } from '../services/user-profile.service';
import { UpdateProfileValueDto } from '../dto/update-profile-value.dto';

@Controller('profiling')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  // GET /profiling/profile/:userId
  @Get('profile/:userId')
  getProfile(@Param('userId') userId: string) {
    return this.userProfileService.getProfile(userId);
  }

  // PATCH /profiling/profile/:userId
  @Patch('profile/:userId')
  updateProfile(
    @Param('userId') userId: string,
    @Body() dto: UpdateProfileValueDto,
  ) {
    return this.userProfileService.updateProfile(userId, dto);
  }
}
