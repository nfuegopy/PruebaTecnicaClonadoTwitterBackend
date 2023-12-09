// some.module.ts
import { Module } from '@nestjs/common';
import { SomeController } from './some.controller';

@Module({
    controllers: [SomeController],
})
export class SomeModule { }
