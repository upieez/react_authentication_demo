module.exports = {
	development: {
		username: 'samuel',
		password: null,
		database: 'react_auth_development',
		host: '127.0.0.1',
		dialect: 'postgres',
	},
	production: {
		use_env_variable: 'DATABASE_URL',
		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: {
				// https://github.com/sequelize/sequelize/issues/12083
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
