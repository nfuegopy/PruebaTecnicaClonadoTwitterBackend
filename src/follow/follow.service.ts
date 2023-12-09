import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }


    async followUser(followerId: number, followedId: number): Promise<{ message: string }> {
        if (followerId === followedId) {
            throw new Error('Un usuario no puede seguirse a sí mismo.');
        }
        await this.userRepository.query('CALL FollowUser(?, ?)', [followerId, followedId]);
        return { message: 'Ahora estás siguiendo al usuario.' };
    }

    async unfollowUser(followerId: number, followedId: number): Promise<{ message: string }> {
        await this.userRepository.query('CALL UnfollowUser(?, ?)', [followerId, followedId]);
        return { message: 'Has dejado de seguir al usuario.' };
    }

    async getFollowers(userId: number): Promise<User[]> {
        return this.userRepository.query('CALL GetFollowers(?)', [userId]);
    }

    async getFollowing(userId: number): Promise<User[]> {
        return this.userRepository.query('CALL GetFollowing(?)', [userId]);
    }




}
