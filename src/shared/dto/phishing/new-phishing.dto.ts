import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewPhishingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
