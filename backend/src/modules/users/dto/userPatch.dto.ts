import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsDateString,
  IsPhoneNumber,
  IsString,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class UserPatchDto {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty({ description: 'User name', nullable: false })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty({ description: 'User surname', nullable: false })
  surName?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ description: 'User birthday', nullable: true })
  birthDate?: Date;

  @IsOptional()
  @IsPhoneNumber('RU')
  @ApiProperty({ description: 'User phone', nullable: true })
  telephone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'User employment', nullable: true })
  employment?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: 'User agreement', nullable: true })
  userAgreement?: boolean;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'The password must be at least 4 characters long' })
  @ApiProperty({
    description: 'User password (optional, for update)',
    nullable: true,
  })
  password?: string;
}
