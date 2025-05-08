import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/user.dto';
import { User } from 'src/interface/user/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<User> {
    return this.userService.register(registerDTO);
  }
}
