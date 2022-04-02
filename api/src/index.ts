import 'reflect-metadata';

import express from 'express';
import loaders from './loaders';
import config from './config';

const main = async () => {
	const app = express();

	await loaders({ expressApp: app });

	app.listen(config.PORT, () => {
		console.log(`
            ################################################
            🛡️  Server listening on port: ${config.PORT} 🛡️
            ################################################
        `);
	});
};

main();
