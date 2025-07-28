import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { IUserCreateResponse } from './users.interface';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserGetDto } from './dto/userGet.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserPatchDto } from './dto/userPatch.dto';

interface RequestWithUser extends Request {
  user: {
    id: any;
    email: string;
  };
}

@ApiBasicAuth()
@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', isArray: true })
  @Get()
  getAll(): UserGetDto[] {
    return this.usersService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  getUser(@Param('id') id: string): UserGetDto | NotFoundException {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Param('id') id: string, @Body() data: UserPatchDto) {
    return this.usersService.updateUser(id, data);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'Success',
  })
  createUser(@Body() data: UserCreateDto): IUserCreateResponse {
    return this.usersService.createUser(data);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  deleteUser(@Param('id') id: string, @Req() req: RequestWithUser): string {
    const requestingUserId = req.user.id;

    if (id === requestingUserId) {
      throw new ForbiddenException('You cannot delete your own account');
    }

    if (id === '1') {
      throw new ForbiddenException('You cannot remove the main administrator');
    }

    this.usersService.deleteUser(id);
    return 'Ok';
  }
}
