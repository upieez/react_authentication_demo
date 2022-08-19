import { resolve } from 'path';

export default function routes(app) {
	app.get('*', (request, response) => {
		response.cookie('wow', 1);
		response.sendFile(resolve('dist', 'main.html'));
	});
}
