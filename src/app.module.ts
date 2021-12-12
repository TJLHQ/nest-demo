import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
@Module({
  imports: [CatsModule, UserModule, AuthModule],
  controllers:[AppController,UserController],
  providers:[AppService]
})
export class AppModule {
}
