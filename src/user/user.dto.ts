import {IsString,MinLength,IsNotEmpty} from 'class-validator'
export class UserDto{
  @IsString({message:'必须为非空字符串'})
  user:string;
  @MinLength(6,{
    message:'长度不能小于6'
  })
  passwd:string
}