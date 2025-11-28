import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().min(10).required(),

  GOOGLE_CALENDAR_ID: Joi.string().optional(),
  GOOGLE_SERVICE_ACCOUNT_JSON: Joi.string().optional(),
});
