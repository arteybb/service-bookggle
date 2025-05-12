import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CustomTokenResponse {
  @IsString()
  firebaseToken: string;
}
