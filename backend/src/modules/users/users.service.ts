import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserGetDto } from './dto/userGet.dto';
import { IUserCreateResponse, IUsersData } from './users.interface';
import { v4 as uuid } from 'uuid';
import { findUserByEmail } from './utils';
import { UserPatchDto } from './dto/userPatch.dto';

export class UsersService {
  private usersDB: Record<string, IUsersData> = {
    '1': {
      name: 'Admin',
      id: '1',
      surName: 'Admin',
      fullName: 'Admin Admin',
      password: 'admin',
      email: 'admin@inno.tech',
    },
  };

  getAll(): UserGetDto[] {
    return Object.values(this.usersDB).map(
      ({ password, ...rest }: IUsersData) => ({ ...rest }),
    );
  }

  createUser({
    email,
    name,
    surName,
    ...rest
  }: UserCreateDto): IUserCreateResponse {
    const id = uuid();

    const checkIsEmailUnique = findUserByEmail(this.usersDB, email);

    if (checkIsEmailUnique)
      throw new HttpException('Already exist', HttpStatus.CONFLICT);

    const fullName = `${name || ''} ${surName || ''}`.trim();

    this.usersDB[id] = { ...rest, email, name, surName, fullName, id };

    return { name, id };
  }

  findById(id: string): UserGetDto | NotFoundException {
    const user = this.usersDB[id];

    if (!user) throw new NotFoundException();

    const { password, ...response } = user;
    return response;
  }

  updateUser(id: string, data: UserPatchDto): string | NotFoundException {
    const user = this.usersDB[id];

    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = { ...user };

    if (data.name !== undefined) {
      updatedUser.name = data.name;
    }
    if (data.surName !== undefined) {
      updatedUser.surName = data.surName;
    }
    if (data.birthDate !== undefined) {
      updatedUser.birthDate = data.birthDate;
    }
    if (data.telephone !== undefined) {
      updatedUser.telephone = data.telephone;
    }
    if (data.employment !== undefined) {
      updatedUser.employment = data.employment;
    }
    if (data.userAgreement !== undefined) {
      updatedUser.userAgreement = data.userAgreement;
    }
    if (data.password !== undefined && data.password !== '') {
      updatedUser.password = data.password;
    }

    updatedUser.fullName = [updatedUser.name, updatedUser.surName]
      .filter(Boolean)
      .join(' ')
      .trim();

    this.usersDB[id] = updatedUser;

    return 'ok';
  }

  findOneByEmail(email: string): IUsersData | null {
    const user = findUserByEmail(this.usersDB, email);

    return user || null;
  }

  deleteUser(id: string): void {
    delete this.usersDB[id];
  }
}
