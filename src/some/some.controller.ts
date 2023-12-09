import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Asegúrate de importar el guard de autenticación JWT correctamente.

@Controller('some')
export class SomeController {
    // ...

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getProtectedRoute() {
        return { message: 'El token es valido' };
    }
}