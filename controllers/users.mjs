import jsSHA from 'jssha';

const SALT = process.env.SALT;

const hashValue = (value) => {
	const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
	shaObj.update(value);
	return shaObj.getHash('HEX');
};

export default function initUsersController(db) {
	const login = async (request, response) => {
		try {
			const user = await db.User.findOne({
				where: {
					email: request.body.email,
				},
			});

			const hashedPassword = hashValue(request.body.password);
			if (user.password !== hashedPassword) {
				response.status(401);
				response.send('authentication failed');
				return;
			}

			const unhashedCookieString = `${user.id}-${SALT}`;
			const hashedCookieString = hashValue(unhashedCookieString);
			response.cookie('loggedInHash', hashedCookieString);
			response.cookie('userId', user.id);
			response.json({ userId: user.id });
		} catch (error) {
			console.log(error);
		}
	};

	const register = async (request, response) => {
		try {
			const hashedPassword = hashValue(request.body.password);

			const user = await db.User.create({
				email: request.body.email,
				password: hashedPassword,
			});

			const unhashedCookieString = `${user.id}-${SALT}`;
			const hashedCookieString = hashValue(unhashedCookieString);

			response.cookie('loggedInHash', hashedCookieString);
			response.cookie('userId', user.id);
			response.json({ userId: user.id });
		} catch (error) {
			console.log(error);
		}
	};

	const verify = (request, response) => {
		const userId = request.cookies.userId;
		const loggedInHash = request.cookies.loggedInHash;

		const unhashedCookieString = `${userId}-${SALT}`;
		const hashedCookieString = hashValue(unhashedCookieString);

		if (hashedCookieString === loggedInHash) {
			response.json({ userId: userId });
		} else {
			response.clearCookie('loggedInHash');
			response.clearCookie('userId');
			response.json({ redirect: '/' });
		}
	};

	const logout = (request, response) => {
		response.clearCookie('loggedInHash');
		response.clearCookie('userId');
		response.json({ redirect: '/' });
	};

	return {
		login,
		register,
		verify,
		logout,
	};
}
