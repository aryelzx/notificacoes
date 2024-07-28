import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller('usuarios')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.appService.createUser(data);
  }
}
