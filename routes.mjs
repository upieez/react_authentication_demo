import { resolve } from 'path';
import db from './models/index.mjs';
import initUsersController from './controllers/users.mjs';

export default function routes(app) {
	const UsersController = initUsersController(db);

	app.post('/login', UsersController.login);
	app.post('/register', UsersController.register);
	app.get('/verify', UsersController.verify);

	app.get('*', (request, response) => {
		response.sendFile(resolve('dist', 'main.html'));
	});
}
