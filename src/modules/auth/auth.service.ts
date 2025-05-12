import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import admin from 'src/common/config/firebase';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async loginByEmail(payload: {
    email: string;
    password: string;
  }): Promise<{ firebaseToken: string }> {
    const user = await this.userService.findByUser(payload.email);

    if (!user || !(await bcrypt.compare(payload.password, user.password))) {
      throw new HttpException(
        {
          resCode: HttpStatus.UNAUTHORIZED,
          resDesc: 'INVALID_USER_OR_PASSWORD',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const firebaseToken: string = await admin
      .auth()
      .createCustomToken(user._id.toString());

    return { firebaseToken };
  }
}
