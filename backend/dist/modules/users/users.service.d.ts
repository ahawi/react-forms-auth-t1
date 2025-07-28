import { NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserGetDto } from './dto/userGet.dto';
import { IUserCreateResponse, IUsersData } from './users.interface';
import { UserPatchDto } from './dto/userPatch.dto';
export declare class UsersService {
    private usersDB;
    getAll(): UserGetDto[];
    createUser({ email, name, surName, ...rest }: UserCreateDto): IUserCreateResponse;
    findById(id: string): UserGetDto | NotFoundException;
    updateUser(id: string, data: UserPatchDto): string | NotFoundException;
    findOneByEmail(email: string): IUsersData | null;
    deleteUser(id: string): void;
}
