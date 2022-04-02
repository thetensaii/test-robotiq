import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { TravelProps } from '../entities/travel.entity';

export class TravelValidator {
	static async create(req: Request, res: Response, next: NextFunction) {
		const createSchema: Joi.ObjectSchema = Joi.object({
			liftID: Joi.number().required(),
			sourceFloor: Joi.number().required(),
			targetFloor: Joi.number().required(),
		}).required();

		try {
			const value: TravelProps = await createSchema.validateAsync(req.body);
			res.locals.travel = value;
			next();
		} catch (error) {
			if (error instanceof Error) {
				res.status(StatusCodes.BAD_REQUEST).send(error.message);
			}
		}
	}
}
