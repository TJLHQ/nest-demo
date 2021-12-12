import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(user: string, passwd: string): Promise<any> {
    const users = await this.authService.setToken({user, passwd});
    if (!user) {
      throw new BadRequestException('错误');
    }
    return users;
  }
}