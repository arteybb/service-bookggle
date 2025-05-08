import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/modules/user/user.service';
import UserSchema from 'src/schema/user.schema';

const allSchema = [{ name: 'users', schema: UserSchema }];
const allService = [UserService];
@Global()
@Module({
  imports: [MongooseModule.forFeature(allSchema)],
  providers: [...allService],
  exports: [...allService, MongooseModule],
})
export class DatabaseModule {}
