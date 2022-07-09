import { ref } from 'vue';
import axios from '../config/axios-config';

const useFetch = () => {
	const data = ref([]);
	const error = ref(null);
	const isPending = ref(false);

	const fetch = async (url) => {
		data.value = [];
		isPending.value = true;

		try {
			const res = await axios.get(url);
			data.value = res.data.data;
			console.log(res.data);
			isPending.value = false;
			error.value = null;
			return res.data;
		} catch (err) {
			isPending.value = false;
			error.value = 'Data Fetching Error';
			console.log(err);
		}
	};

	return { data, error, fetch, isPending };
};

export default useFetch;
