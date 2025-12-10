import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Appointment } from './entities/appointment.entity';
import type { Prisma } from 'src/generated/prisma/client';
import { GoogleCalendarService } from 'src/google/google-calendar.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private googleCalendarService: GoogleCalendarService,
  ) {}
  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    const data: Prisma.AppointmentCreateInput = {
      name: dto.name,
      email: dto.email,
      appointmentDateTime: new Date(dto.appointmentDateTime),
      notes: dto.notes ?? null,
    };

    const appointment = await this.prisma.appointment.create({ data });

    const eventId = await this.googleCalendarService.createEvent(appointment);
    await this.prisma.appointment.update({
      where: { id: appointment.id },
      data: { googleEventId: eventId },
    });

    return appointment;
  }

  findAll() {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }
}
