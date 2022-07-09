import { ref } from 'vue';
import axios from '../config/axios-config';

const useData = () => {
	const response = ref(null);
	const error = ref(null);
	const loading = ref(false);
	const unknownError = ref(null);

	const create = async (url, data) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await axios.post(url, data);
			response.value = res.data;
			error.value = null;
			unknownError.value = null;
			loading.value = false;
			console.log(res.data);
			return res.data;
		} catch (err) {
			loading.value = false;
			console.log(err.response.data.message);
			error.value = err.response.data;
			// if (err.message.includes('422')) {
			// 	error.value = err.response.data;

			// 	console.log(err.response.data);
			// 	unknownError.value = null;
			// } else {
			// 	unknownError.value = 'Please check your internet connection';
			// 	error.value = null;
			// 	response.value = null;
			// }
		}
	};

	const update = async (url, data) => {
		loading.value = true;
		error.value = null;
		try {
			const res = await axios.patch(url, data);
			response.value = res.data;
			// console.log('from useData',response.data);
			error.value = null;
			unknownError.value = null;
			loading.value = false;
			return res.data;
		} catch (err) {
			loading.value = false;

			if (err.message.includes('422')) {
				error.value = err.response.data;

				console.log(err.response.data);
				unknownError.value = null;
			} else {
				unknownError.value = 'Please check your internet connection';
				error.value = null;
				response.value = null;
			}
		}
	};
	return { response, error, create, update, loading, unknownError };
};

export default useData;
