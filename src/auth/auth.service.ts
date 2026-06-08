import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dtos/auth';
import { HashService } from '../common/providers/hash/hash.service';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private hashService: HashService,
        private jwtService: JwtService
    ) { }

    async register(data: RegisterDto) {
        const userExists = await this.usersRepository.findByEmail(data.email);

        if (userExists) {
            throw new UnauthorizedException('Usuário já existe');
        }

        const passwordHash = await this.hashService.hash(data.password);

        const user = await this.usersRepository.create({
            name: data.name,
            email: data.email,
            passwordHash: passwordHash,
            role: data.role
        });

        const { passwordHash: _, ...result } = user;
        return { message: 'Usuário criado com sucesso', user: result };
    }

    async login(data: LoginDto) {
        const user = await this.usersRepository.findByEmail(data.email);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const isPasswordValid = await this.hashService.compare(data.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        
        return { 
            message: 'Usuário logado com sucesso', 
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
