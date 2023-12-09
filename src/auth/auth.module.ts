import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Importa el módulo de usuarios si estás utilizando uno.
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
    imports: [
        UsersModule, // Solo si tienes un módulo de usuarios y estás utilizando servicios/repositorios de usuarios en AuthService.
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secretKey', // Debe ser una clave secreta compleja y guardada en variables de entorno.
            signOptions: { expiresIn: '60m' }, // Establece un tiempo de expiración adecuado.
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService], // Exporta AuthService si lo vas a usar fuera del módulo.
})
export class AuthModule { }
