import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweets.entity';

@Injectable()
export class TweetsService {
    constructor(
        @InjectRepository(Tweet)
        private tweetsRepository: Repository<Tweet>,
    ) { }

    async createTweet(userId: number, content: string): Promise<any> {

        const result = await this.tweetsRepository.query('CALL InsertTweet(?, ?)', [userId, content]);
        return result;
    }

    async getTweetsByUser(userId: number): Promise<Tweet[]> {
        return this.tweetsRepository.query('CALL ListTweetsByUser(?)', [userId]);
    }

    // Método para actualizar un tweet
    async updateTweet(tweetId: number, content: string): Promise<{ message: string }> {
        await this.tweetsRepository.query('CALL UpdateTweet(?, ?)', [tweetId, content]);
        return { message: 'Tweet actualizado exitosamente.' };
    }

    // Método para eliminar un tweet
    async deleteTweet(tweetId: number): Promise<{ message: string }> {
        await this.tweetsRepository.query('CALL DeleteTweet(?)', [tweetId]);
        return { message: 'Tweet eliminado exitosamente.' };
    }




}
