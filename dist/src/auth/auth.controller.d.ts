import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dtos/auth';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(data: RegisterDto): Promise<{
        message: string;
        user: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(data: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
