import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/interface/user/user.interface';
import { RegisterDTO } from './dto/user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  async register(registerDto: RegisterDTO): Promise<User> {
    const user = await this.userModel.findOne({
      username: registerDto.username,
    });
    if (user) {
      throw new HttpException(
        {
          resCode: HttpStatus.CONFLICT,
          resDesc: 'USER_ALREADY_EXISTS',
        },
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = new this.userModel({
      ...registerDto,
      password: hashedPassword,
    });

    return newUser.save();
  }
}
