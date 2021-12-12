import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {AuthService} from './auth.service'
import { UserDto } from '../user/user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly autoService:AuthService){}
  @Get()
  getName():string{
    return 'auth'
  }
  @UsePipes(new ValidationPipe())
  @Get('token')
  setToken(@Query() query:UserDto){
    return this.autoService.setToken(query)
  }
}
