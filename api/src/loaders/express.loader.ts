import express from 'express';
import { ApiRouter } from '../routes/api.route';
import cors from 'cors';

export default async ({ app }: { app: express.Application }): Promise<void> => {
	app.use(cors());

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use('/api', ApiRouter);
};
