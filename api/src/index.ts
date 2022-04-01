import express from 'express';
const PORT = 8080;

const main = () => {
	const app = express();

	app.listen(PORT, () => {
		console.log(`
            ################################################
            🛡️  Server listening on port: ${PORT} 🛡️
            ################################################
        `);
	});
};

main();
