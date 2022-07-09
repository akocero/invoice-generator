import { ref } from 'vue';
import axios from '../config/axios-config';

const response = ref(null);
const error = ref(null);
const isPending = ref(false);

const login = async (url, payload) => {
	isPending.value = true;
	console.log('in uselogin:', payload);
	try {
		const res = await axios.post(url, payload);

		isPending.value = false;
		error.value = null;
		response.value = res.data;
		console.log('eto ang data', res);
		return res.data.data;
	} catch (err) {
		isPending.value = false;
		response.value = null;

		// console.log(err.response.data);
		error.value = err.response.data;
		// if (err.response.status === 422) {
		// 	error.value = err.response.data;
		// } else {
		// 	error.value = err.message;
		// }
	}
};

const useLogin = () => {
	return { response, error, login, isPending };
};

export default useLogin;
