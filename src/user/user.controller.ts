import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post, Query, UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Headers
} from '@nestjs/common';
import {Person} from '../type'
import {UserService} from './user.service'
import { UserDto } from './user.dto';
import { DataInterceptor } from '../interceptor/dataInterceptor';
import {AuthService} from '../auth/auth.service'
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipes } from '../validations/validation.pipe';
import { RbacGuard } from '../guard/rbac.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService,private readonly authService:AuthService){}
  @UseGuards(new RbacGuard(2))
  @UsePipes(new ValidationPipes())
  @Get('findAll')
  findAll(@Query() data){
    return 'aaa'
  }
  @Get()
  getload(){
    return 'user-get'
  }
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() userDto:UserDto){
    return userDto;
  }
  @Get('id/:id')
  @UseInterceptors(new DataInterceptor<Person>())
  findOne(@Param('id',new ParseIntPipe()) id){
    return this.userService.findOne(id)
  }
  @Get('add')
  @UseGuards(AuthGuard('jwt'))
  add(@Headers() token,@Body('body') user:any):string{
    return 'aaa'
  }
  @Get('login')
  login(@Query(new ValidationPipe()) user:UserDto){
    return user;
  }
  @Get('resign')
  resign(@Query() query){
   return  this.authService.certificate(query)
  }
}
