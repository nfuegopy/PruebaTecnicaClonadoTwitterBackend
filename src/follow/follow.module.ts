import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { User } from '../users/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [FollowController],
    providers: [FollowService],
})
export class FollowModule { }
