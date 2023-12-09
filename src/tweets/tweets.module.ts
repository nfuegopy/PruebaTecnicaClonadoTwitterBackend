import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { Tweet } from './tweets.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tweet])],
    controllers: [TweetsController],
    providers: [TweetsService],
})
export class TweetsModule { }
