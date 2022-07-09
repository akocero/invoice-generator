import axios from 'axios';
import store from '@/store';

const axiosConfig = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
	headers: {
		Authorization: `Bearer ${store.getters.getToken}`
	}
});

export default axiosConfig;
