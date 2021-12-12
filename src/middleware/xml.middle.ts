import { Injectable, NestMiddleware } from '@nestjs/common';
import {Request,Response,NextFunction} from 'express'
import {parseString} from 'xml2js'
@Injectable()
export class XmlMiddle implements NestMiddleware{
  use(req: Request, res: Response, next: NextFunction): any {
    const contentType:string=req.headers['content-type']||'';
    if(contentType.includes('application/xml')){
    req.on('data',merg=>{
      parseString(merg,(err,result)=>{
        req['body']=result;
      })
    })
  }
    console.log('333333')
    next()
  }
}