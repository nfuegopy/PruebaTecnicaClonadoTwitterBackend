//app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module'
import { FollowModule } from './follow/follow.module'
import { SomeModule } from './some/some.module';
import { User } from './users/users.entity';
import { Tweet } from './tweets/tweets.entity';


import { AuthModule } from './auth/auth.module';
@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'Twitter_clonado',
      entities: [User, Tweet],
      // Asegúrate de agregar las entidades aquí cuando las tengas
    }),
    UsersModule,
    TweetsModule,
    FollowModule,
    AuthModule,
    SomeModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
