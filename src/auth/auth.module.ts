import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_PRIVATE_KEY'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [MongooseModule, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}