import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req=context.switchToHttp().getRequest();
    const token=context.switchToRpc().getData().headers.token;
    if(this.hasUrl(this.urlList,req.url)){
      return true;
    }
    if(token){
      try{
        return true;
      }catch (e) {
        throw new HttpException('没有授权访问请先登录',HttpStatus.UNAUTHORIZED)
      }
    }else {
      throw new HttpException('没有访文权限，请先登录',HttpStatus.UNAUTHORIZED)
    }
  }
  private urlList:string[]=[
    '/user/login'
  ]
  private hasUrl(urlList:string[],url:string):boolean{
    let flag=false;
    if(urlList.includes(url)){
      flag=true;
    }
    return flag;
  }
}