// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity'; // Asegúrate de que la ruta sea correcta
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>, // Asegúrate de tener la entidad User
    ) { }

    async createUser(username: string, email: string, password: string): Promise<any> {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const newUser = await this.usersRepository.query('CALL InsertUser(?, ?, ?)', [username, email, hashedPassword]);
            return { message: 'User creado exitosamente', userId: newUser.insertId };
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }


    async updateUser(userId: number, username: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await this.usersRepository.query('CALL UpdateUser(?, ?, ?, ?)', [userId, username, email, hashedPassword]);
        return updatedUser[0][0];
    }


    async findAllUsers(): Promise<User[]> {
        return this.usersRepository.query('CALL ListAllUsers()');
    }

    async findUserById(userId: number): Promise<User> {
        return this.usersRepository.query('CALL ListUserById(?)', [userId]);
    }

    async findUsersByUsername(username: string): Promise<User[]> {
        return this.usersRepository.query('CALL ListUsersByUsername(?)', [username]);
    }

    async deleteUser(userId: number): Promise<void> {
        await this.usersRepository.query('CALL DeleteUser(?)', [userId]);
        console.log("Se Elimino correctamente el Usuario")
    }


}
