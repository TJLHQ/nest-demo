import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RbacGuard implements CanActivate {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
  constructor(private readonly role:number){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const req=context.switchToHttp().getRequest();
    // const role=req.user.role||2;
    if(2>this.role){
      throw new BadRequestException('你没有权限操作')
    }
    return true;
  }
}
