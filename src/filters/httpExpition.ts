import {Response,Request} from 'express'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
@Catch()
export class HttpExpitionFilter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx=host.switchToHttp();
    const request=ctx.getRequest<Request>()
    const response=ctx.getResponse<Response>()
    const status=exception instanceof HttpException?exception.getStatus():HttpStatus.INTERNAL_SERVER_ERROR;
    const message=(exception.getResponse() as any).message||exception.message;
    const msgLog={
      statusCode:status,
      timeStamp:new Date().toISOString(),
      path:request.url,
      message
    }
    Logger.error(
      '错误信息',
      JSON.stringify(msgLog),
      'HttpException'
    )
    response.status(status).json(msgLog)
  }
}