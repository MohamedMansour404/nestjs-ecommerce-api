import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from './guard/auth-roles.guard';
import { Roles } from './decorators/user-role.decorator';
import { UserType } from 'src/utils/enums';
import * as bcrypt from 'bcrypt';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
