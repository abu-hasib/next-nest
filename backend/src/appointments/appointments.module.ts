import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleCalendarService } from 'src/google/google-calendar.service';

@Module({
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    PrismaService,
    JwtService,
    GoogleCalendarService,
  ],
})
export class AppointmentsModule {}
