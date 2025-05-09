import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/type/role.type';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: string;
}
