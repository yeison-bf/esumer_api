import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) { // Cambiar a string
    return this.userService.findOne(id);
  }


  @Get('roles/:id')
  async getOneByRoles(@Param('id') id: string) { // Cambiar a string
    return this.userService.findByRole(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }) {
    return this.userService.login(email, password);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) { // Cambiar a string
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { // Cambiar a string
    return this.userService.remove(id);
  }
}
