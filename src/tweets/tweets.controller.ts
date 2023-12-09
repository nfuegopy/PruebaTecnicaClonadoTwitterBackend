import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
    constructor(private readonly tweetsService: TweetsService) { }

    @Post()
    async create(@Body() body) {
        return this.tweetsService.createTweet(body.userId, body.content);
    }

    @Get('/user/:userId')
    async getTweetsByUser(@Param('userId') userId: number) {
        return this.tweetsService.getTweetsByUser(userId);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body('content') content: string) {
        return this.tweetsService.updateTweet(id, content);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.tweetsService.deleteTweet(id);
    }


}
