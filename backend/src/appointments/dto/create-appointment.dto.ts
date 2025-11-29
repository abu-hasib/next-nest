import { IsEmail, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsDateString()
  appointmentDateTime!: string; // will convert to Date in service

  @IsOptional()
  @IsString()
  notes?: string;
}
