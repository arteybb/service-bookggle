import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomTokenResponse, LoginDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<CustomTokenResponse> {
    return this.authService.loginByEmail({
      email: loginDTO.email,
      password: loginDTO.password,
    });
  }
}
