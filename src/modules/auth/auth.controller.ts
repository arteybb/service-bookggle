import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/interface/user/user.interface';
import { LoginDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO.username, loginDTO.password);
  }
}
