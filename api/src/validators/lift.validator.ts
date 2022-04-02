import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

export class LiftValidator {
	static async findByID(req: Request, res: Response, next: NextFunction) {
		const findByIDSchema: Joi.ObjectSchema = Joi.object({
			id: Joi.number().required(),
		}).required();

		try {
			await findByIDSchema.validateAsync(req.params);
			next();
		} catch (error) {
			if (error instanceof Error) {
				res.status(StatusCodes.BAD_REQUEST).send(error.message);
			}
		}
	}
}
