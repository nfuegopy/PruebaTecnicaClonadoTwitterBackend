import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tweet } from '../tweets/tweets.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Tweet, tweet => tweet.user)
    tweets: Tweet[];

}
