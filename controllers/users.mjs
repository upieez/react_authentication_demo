import jsSHA from 'jssha';

const SALT = 'salt';

export default function initUsersController(db) {
	const login = async (request, response) => {
		try {
			const user = await db.User.findOne({
				where: {
					email: request.body.email,
				},
			});
			const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
			const unhashedCookieString = `${user.id}-${SALT}`;
			shaObj.update(unhashedCookieString);
			const hashedCookieString = shaObj.getHash('HEX');
			response.cookie('loggedInHash', hashedCookieString);
			response.cookie('userId', user.id);
			response.json({ userId: user.id });
		} catch (error) {
			console.log(error);
		}
	};

	const register = async (request, response) => {
		try {
			const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
			shaObj.update(request.body.password);
			const hashedPassword = shaObj.getHash('HEX');

			const user = await db.User.create({
				email: request.body.email,
				password: hashedPassword,
			});

			const shaIdObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
			const unhashedCookieString = `${user.id}-${SALT}`;
			shaIdObj.update(unhashedCookieString);
			const hashedCookieString = shaIdObj.getHash('HEX');

			response.cookie('loggedInHash', hashedCookieString);
			response.cookie('userId', user.id);
			response.send('registered');
		} catch (error) {
			console.log(error);
		}
	};

	const verify = async (request, response) => {
		const userId = request.cookies.userId;
		const loggedInHash = request.cookies.loggedInHash;

		const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
		const unhashedCookieString = `${userId}-${SALT}`;
		shaObj.update(unhashedCookieString);
		const hashedCookieString = shaObj.getHash('HEX');

		if (hashedCookieString === loggedInHash) {
			response.send('logged in');
		} else {
			response.clearCookie('loggedInHash');
			response.clearCookie('userId');
			response.json({ redirect: '/' });
		}
	};

	return {
		login,
		register,
		verify,
	};
}
