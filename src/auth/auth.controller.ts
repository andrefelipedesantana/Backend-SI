import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dtos/auth';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('register')
    async register(@Body() data: RegisterDto) {
        return this.authService.register(data);
    }

    @Public()
    @Post('login')
    async login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }
}
