import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    name: string;

    @IsEmail({}, { message: 'Forneça um email válido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string;

    @IsEnum(Role, { message: 'Role deve ser ADMIN ou BROKER' })
    role: Role;
}

export class LoginDto {
    @IsEmail({}, { message: 'Forneça um email válido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'A senha é obrigatória' })
    password: string;
}