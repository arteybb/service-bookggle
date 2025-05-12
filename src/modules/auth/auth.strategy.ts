import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  Strategy,
  'firebase-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string): Promise<any> {
    try {
      const user = await auth().verifyIdToken(token, true);
      return user;
    } catch (err) {
      console.error('Error verifying Firebase token:', err);
      throw new HttpException(
        {
          resCode: HttpStatus.UNAUTHORIZED,
          resDesc: 'UNAUTHORIZED',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
