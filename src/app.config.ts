import { isValidationOptions } from 'class-validator';
import * as Joi from 'joi';

export const AppConfig = {
    validationSchema: Joi.object({
        NODE_ENV: Joi.string()
            .valid('development','production','test','provision')
            .default('development'),
        PORT: Joi.number().default(3002),
        API_ROUTE: Joi.string().default('/api/v1'),
        API_SWAGGER: Joi.string().default('swagger'),

        // JWT_SECRET: Joi.string().default('drink'),
        // JWT_EXPIRATION: Joi.string().default('2d'),
    }),
    validationOptions: {
        allowUnknown: true,
        abortEarly: true,
    },
    isGlobal: true,
}