import { Router } from 'express';
import { LiftRouter } from './lift.route';
import { TravelRouter } from './travel.route';

export const ApiRouter = Router();

ApiRouter.use('/lifts', LiftRouter);
ApiRouter.use('/travels', TravelRouter);
