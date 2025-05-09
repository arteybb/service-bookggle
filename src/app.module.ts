import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGO_URI,
          dbName: process.env.MONGO_DB,
        };
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}