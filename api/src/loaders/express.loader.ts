import express from 'express';
import { ApiRouter } from '../routes/api.route';

export default async ({ app }: { app: express.Application }): Promise<void> => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use('/api', ApiRouter);
};
