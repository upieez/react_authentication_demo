import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuth = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(() => {
		const userId = Cookies.get('userId');

		if (userId) {
			return { userId: userId };
		}

		return { userId: '' };
	});

	useEffect(() => {
		if (user.userId) {
			axios.get('/verify').then((res) => {
				if (res.data.redirect) {
					navigate(`${res.data.redirect}`, { replace: true });
				}
			});
		}
	}, [navigate]);

	return { user, setUser };
};

export default useAuth;
