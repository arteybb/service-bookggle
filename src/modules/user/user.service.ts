import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/interface/user/user.interface';
import { RegisterDTO } from './dto/user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  async register(registerDto: RegisterDTO): Promise<User> {
    const user = new this.userModel(registerDto);
    return user.save();
  }
}
