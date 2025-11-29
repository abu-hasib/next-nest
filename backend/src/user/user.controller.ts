import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return await this.userService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
