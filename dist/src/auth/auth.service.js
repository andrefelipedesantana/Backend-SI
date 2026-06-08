"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const hash_service_1 = require("../common/providers/hash/hash.service");
const users_repository_1 = require("./repositories/users.repository");
let AuthService = class AuthService {
    usersRepository;
    hashService;
    jwtService;
    constructor(usersRepository, hashService, jwtService) {
        this.usersRepository = usersRepository;
        this.hashService = hashService;
        this.jwtService = jwtService;
    }
    async register(data) {
        const userExists = await this.usersRepository.findByEmail(data.email);
        if (userExists) {
            throw new common_1.UnauthorizedException('Usuário já existe');
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
    async login(data) {
        const user = await this.usersRepository.findByEmail(data.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const isPasswordValid = await this.hashService.compare(data.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            message: 'Usuário logado com sucesso',
            access_token: await this.jwtService.signAsync(payload)
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        hash_service_1.HashService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map