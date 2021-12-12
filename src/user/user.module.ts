import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Module({
  // controllers: [UserController],
  providers:[UserService],
  exports:[UserService],
  // imports:[AuthService]
})
export class UserModule {}
