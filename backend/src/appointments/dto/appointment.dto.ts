export class AppointmentDto {
  id!: string;
  name!: string;
  email!: string;
  appointmentDateTime!: Date;
  notes?: string | null;
  googleEventId?: string | null;
  createdAt!: Date;
}
