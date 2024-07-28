import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { addDays, isEqual } from 'date-fns';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'notifications',
    timeZone: 'Brasilia/Brazil'
  })
  async handleCron() {
    const users = await this.prisma.user.findMany();
    const tomorrow = addDays(new Date(), 1);

    for (const user of users) {
      const birthday = new Date(user.data_nascimento);
      const birthdayThisYear = new Date(
        tomorrow.getFullYear(),
        birthday.getMonth(),
        birthday.getDate()
      );

      if (isEqual(tomorrow, birthdayThisYear)) {
        this.sendNotification(user)
      }
    }
  }
  
  private sendNotification(user: any) {
    // Lógica para enviar notificação (e.g., email, SMS, etc.)
    console.log(`Enviando notificação para ${user.name}`);
  }
}
