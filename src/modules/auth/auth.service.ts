import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByUser(username);
    if (!user) {
      throw new HttpException(
        {
          resCode: HttpStatus.NOT_FOUND,
          resDesc: 'USER_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        {
          resCode: HttpStatus.UNAUTHORIZED,
          resDesc: 'INVALID_USER_OR_PASSWORD',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
