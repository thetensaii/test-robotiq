import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Container from 'typedi';
import { LiftEntity } from '../entities/lift.entity';
import { HttpError } from '../errors/http.error';
import { LiftService } from '../services/lift.service';
import { LiftValidator } from '../validators/lift.validator';

export const LiftRouter = Router();

LiftRouter.get('/', async (req: Request, res: Response) => {
	const liftService = Container.get(LiftService);

	try {
		const liftsEntity: LiftEntity[] = await liftService.findAll();

		res.status(StatusCodes.OK).json(liftsEntity.map((l) => l.toJSON()));
	} catch (error) {
		if (error instanceof HttpError) {
			res.status(error.httpCode).send(error.message);
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
});

LiftRouter.get('/:id', LiftValidator.findByID, async (req: Request, res: Response) => {
	const liftService = Container.get(LiftService);
	const liftID: number = +req.params.id;

	try {
		const liftEntity: LiftEntity = await liftService.findByID(liftID);

		res.status(StatusCodes.OK).json(liftEntity.toJSON());
	} catch (error) {
		if (error instanceof HttpError) {
			res.status(error.httpCode).send(error.message);
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
});
