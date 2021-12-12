import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Resign } from '../type';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService:JwtService){}
  setToken(users:Resign){
    try {
      const token = this.jwtService.sign(users);
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      throw new HttpException({message:`账号或密码错误`},404)
    }
  }
  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(user);
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      throw new HttpException('账号或密码错误',400)
    }
  }
}
