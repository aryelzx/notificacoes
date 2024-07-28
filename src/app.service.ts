import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  createUser(data: CreateUserDto) {
    const parsedDate = new Date(data.data_nascimento);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Data de nascimento inválida');
    }

    const userData = {
      ...data,
      data_nascimento: parsedDate
    };

    return this.prismaService.user.create({
      data: userData,
    });
  }
}
