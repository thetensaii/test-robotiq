import express from 'express';
import expressLoader from './express.loader';
import modelLoader from './model.loader';

export default async ({ expressApp }: { expressApp: express.Application }): Promise<void> => {
	await modelLoader();
	console.info('✌️ Model loaded');

	await expressLoader({ app: expressApp });
	console.info('✌️ Express loaded');
};
