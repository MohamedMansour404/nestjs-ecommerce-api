import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserType } from 'src/utils/enums';
import { User } from './entities/user.entity';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthRolesGuard } from 'src/auth/guards/auth-roles.guard';
import { Roles } from 'src/auth/decorators/user-role.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AuthRolesGuard)
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Create a new user (admin only)' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AuthRolesGuard)
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  getAll(@Query() query: GetUsersQueryDto) {
    return this.userService.getAll(query);
  }

  @Get('email')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AuthRolesGuard)
  @Roles(UserType.ADMIN, UserType.USER)
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, description: 'User details by email.' })
  async getUserByEmail(@Query('email') email: string): Promise<User | null> {
    return this.userService.getUserByEmail(email);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AuthRolesGuard)
  @Roles(UserType.ADMIN, UserType.USER)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details by ID.' })
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AuthRolesGuard)
  @Roles(UserType.ADMIN, UserType.USER)
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AuthRolesGuard)
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted Successfully' })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
