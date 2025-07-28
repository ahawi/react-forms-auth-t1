import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserCreateResponse } from './users.interface';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserGetDto } from './dto/userGet.dto';
import { UserPatchDto } from './dto/userPatch.dto';
interface RequestWithUser extends Request {
    user: {
        id: any;
        email: string;
    };
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(): UserGetDto[];
    getUser(id: string): UserGetDto | NotFoundException;
    updateUser(id: string, data: UserPatchDto): string | NotFoundException;
    createUser(data: UserCreateDto): IUserCreateResponse;
    deleteUser(id: string, req: RequestWithUser): string;
}
export {};
