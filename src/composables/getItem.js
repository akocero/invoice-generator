import { ref } from 'vue';
import axios from '../config/axios-config';

const getItem = (id, url) => {
	const item = ref(null);
	const error = ref(null);
	const loading = ref(false);

	const load = async () => {
		loading.value = true;
		try {
			const res = await axios.get(`${url}/${id}`);
			// console.log(res.data)
			item.value = res.data.data;
			loading.value = false;
			return res.data;
		} catch (err) {
			console.log(err.message);
			loading.value = false;
		}
	};

	return { item, error, load, loading };
};

export default getItem;
