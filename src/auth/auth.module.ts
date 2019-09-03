import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';

const jwtSecret = process.env.JWT_SECRET;
@ Module({
  imports: [UserModule, PassportModule.register({
    defaultStrategy: 'jwt'
  }), JwtModule.register({
    secretOrPrivateKey: jwtSecret,
    signOptions: {expiresIn: '1d'}
  })],
  providers: [AuthService, AuthResolver, LocalStrategy,
    JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
