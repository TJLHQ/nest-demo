import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
interface Response<T> {
  data:T
}
@Injectable()
export class DataInterceptor<T> implements NestInterceptor<T,Response<T>>{
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    const ctx=context.switchToHttp();
    const req=ctx.getRequest();
    console.log('进入之前的')
    return next.handle().pipe(
      map(data=>{
        console.log('进入之后的方法')
        console.log(data)
        return {
          statusCode:0,
          timeStamp:new Date().toISOString(),
          path:req.url,
          message:'登录成功',
          data:data
        }
      })
    )
  }
}