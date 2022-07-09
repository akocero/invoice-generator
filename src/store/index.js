import { createStore } from 'vuex';
import Cookies from 'js-cookie';

export default createStore({
	state: {
		user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
		token: Cookies.get('token') ? Cookies.get('token') : null
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
			Cookies.set('user', JSON.stringify(payload), { expires: 7 });
		},

		removeUser(state) {
			Cookies.remove('user');
			state.user = null;
		},

		setToken(state, payload) {
			state.token = payload;
			Cookies.set('token', payload, { expires: 7 });
		},

		removeToken(state) {
			Cookies.remove('token');
			state.token = null;
		}
	},
	actions: {},
	modules: {},
	getters: {
		getUser(state) {
			return state.user;
		},
		getToken(state) {
			return state.token;
		}
	}
});
