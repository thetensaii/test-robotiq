import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Container from 'typedi';
import { TravelProps } from '../entities/travel.entity';
import { HttpError } from '../errors/http.error';
import { TravelService } from '../services/travel.service';
import { TravelValidator } from '../validators/travel.validator';

export const TravelRouter = Router();

TravelRouter.post('/', TravelValidator.create, async (req: Request, res: Response) => {
	const travel: TravelProps = res.locals.travel;
	const travelService: TravelService = Container.get(TravelService);

	try {
		await travelService.create(travel);
		res.status(StatusCodes.CREATED).json({});
	} catch (error) {
		if (error instanceof HttpError) {
			res.status(error.httpCode).send(error.message);
		} else if (error instanceof Error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
});
