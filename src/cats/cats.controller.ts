import {
  Controller,
  Get,
  Redirect,
  Query,
  Param,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UploadedFiles, HttpException, HttpStatus,
} from '@nestjs/common';
import {CatsService} from './cats.service'
import { Cat } from '../type';
import {Person} from '../type'
import { InterceptorsConsumer } from '@nestjs/core/interceptors/interceptors-consumer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { doc } from 'prettier';
import {join} from 'path'
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService:CatsService){}
  @Get()
  getInit() {
    return 'hello world3'
  }
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
  @Get('aa')
  getall(@Query('version') version) {
    console.log(version)
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
  // @Get(':id')
  // findOne(@Param('id') id): string {
  //   return `This action returns a #${id} cat`;
  // }
  @Get('async')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  @Post('create')
  async create(@Body() createCatDto: Cat) {
    this.catsService.create(createCatDto)
  }
  @Post('form')
  postForm(@Body() forms:Person){
  console.log(forms)
  }
  @Post('upload')
  @UseInterceptors(FilesInterceptor('pic'))
  postUpload(@UploadedFiles() files,@Body() body){
    for(const file of files){
      const writeImage =
        createWriteStream(join(__dirname, '../../', 'public/upload', `${Date.now()}-${file.originalname}`));
      writeImage.write(file.buffer);
    }
    console.log(body);
    console.log(files);
    return '上传成功';
  }
  @Get('err')
  getErr(@Query() {id}){
    if(!id||id>5){
      throw new HttpException({id:'id不能为空',status:HttpStatus.BAD_REQUEST},200)
    }else{
      return 'ok'
    }
  }
}
