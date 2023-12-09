// users.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async addUser(@Body() body) {
        return await this.usersService.createUser(body.username, body.email, body.password);
    }


    @Patch(':id') // Utiliza el método PATCH para actualizaciones
    async updateUser(@Param('id') id: number, @Body() body) {
        return await this.usersService.updateUser(id, body.username, body.email, body.password);
    }



    @Get()
    async getAllUsers() {
        return this.usersService.findAllUsers();
    }

    @Get('/search')
    async getUsersByUsername(@Query('username') username: string) {
        return this.usersService.findUsersByUsername(username);
    }

    @Get(':id')
    async getUserById(@Param('id') id: number) {
        return this.usersService.findUserById(id);
    }


    @Delete(':id')
    async removeUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }


}
