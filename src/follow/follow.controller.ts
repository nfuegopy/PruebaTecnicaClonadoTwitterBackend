import { Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
    constructor(private readonly followService: FollowService) { }

    @Post(':followerId/:followedId')
    async follow(@Param('followerId') followerId: number, @Param('followedId') followedId: number) {
        try {
            return await this.followService.followUser(followerId, followedId);
        } catch (error) {
            return { message: error.message };
        }
    }

    @Delete(':followerId/:followedId')
    async unfollow(@Param('followerId') followerId: number, @Param('followedId') followedId: number) {
        return this.followService.unfollowUser(followerId, followedId);
    }


    @Get('followers/:userId')
    async getFollowers(@Param('userId') userId: number) {
        return this.followService.getFollowers(userId);
    }

    @Get('following/:userId')
    async getFollowing(@Param('userId') userId: number) {
        return this.followService.getFollowing(userId);
    }




}
