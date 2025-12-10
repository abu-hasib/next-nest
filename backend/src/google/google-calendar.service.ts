import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

interface GoogleServiceAccountCredentials {
  client_email: string;
  private_key: string;
}

export interface AppointmentData {
  name: string;
  notes?: string | null;
  appointmentDateTime: Date;
}

interface EventDateTime {
  dateTime: string;
  timeZone?: string;
}

export interface GoogleCalendarEvent {
  summary: string;
  location?: string;
  description?: string;
  start: EventDateTime;
  end: EventDateTime;
}

@Injectable()
export class GoogleCalendarService {
  private calendar;
  private calendarId: string;

  constructor(private config: ConfigService) {
    const serviceAccountJson = this.config.get<string>(
      'GOOGLE_SERVICE_ACCOUNT_JSON',
    );
    if (!serviceAccountJson) {
      throw new Error(
        'GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set',
      );
    }
    const credentials: GoogleServiceAccountCredentials = JSON.parse(
      serviceAccountJson,
    ) as {
      client_email: string;
      private_key: string;
    };

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendarId = this.config.get<string>('GOOGLE_CALENDAR_ID');
    if (!calendarId) {
      throw new Error('GOOGLE_CALENDAR_ID environment variable is not set');
    }
    this.calendarId = calendarId;
    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async createEvent(appointment: AppointmentData): Promise<string> {
    const requestBody: GoogleCalendarEvent = {
      summary: `Appointment with ${appointment.name}`,
      description: appointment.notes ?? '',
      start: { dateTime: appointment.appointmentDateTime.toISOString() },
      end: {
        dateTime: new Date(
          appointment.appointmentDateTime.getTime() + 30 * 60000,
        ).toISOString(),
      },
    };
    const response = await this.calendar.events.insert({
      calendarId: this.calendarId,
      requestBody,
    });

    return response.data.id;
  }
}
