import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dtos/auth';
import { HashService } from '../common/providers/hash/hash.service';
import { UsersRepository } from './repositories/users.repository';
export declare class AuthService {
    private usersRepository;
    private hashService;
    private jwtService;
    constructor(usersRepository: UsersRepository, hashService: HashService, jwtService: JwtService);
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
