import axios from 'axios';
import store from '@/store';

const axiosConfig = axios.create({
	baseURL: 'https://papierenei.herokuapp.com/api/v1/',
	headers: {
		Authorization: `Bearer ${store.getters.getToken}`
	}
});

export default axiosConfig;
