import { Injectable } from '@nestjs/common';
import { encryptPassword, makeSalt } from '../utils/crypto';
import { Resign } from '../type';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  findOne(id: any) {
    return {
      code:1,
      data:id
    };
  }
  regign(query:Resign){
    const {passwd}=query;
    const salt=makeSalt();
    const hashPwd=encryptPassword(passwd,salt)
    return hashPwd
  }
}
