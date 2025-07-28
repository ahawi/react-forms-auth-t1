import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login({ email, password }: LoginDto, response: Response): Promise<{
        message: string;
    } | UnauthorizedException>;
    logout(response: Response): Record<string, string>;
    getMe(req: Record<string, any>): Response;
}
