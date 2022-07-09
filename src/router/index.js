import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Items from '../views/Items.vue';
import CreateInvoice from '../views/CreateInvoice.vue';
import Customers from '../views/customer/index.vue';
import store from '@/store';

const authRequired = (to, from, next) => {
	const authorized = store.getters.getUser ? next() : next({ name: 'login' });
};

const noAuthRequired = (to, from, next) => {
	const authorized = store.getters.getUser ? next({ name: 'home' }) : next();
};

const routes = [
	{
		path: '/signup',
		name: 'signup',
		component: Signup,
		beforeEnter: noAuthRequired
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		beforeEnter: noAuthRequired
	},
	{
		path: '/app',
		name: 'main',
		component: () => import('@/components/Main'),
		beforeEnter: authRequired,
		children: [
			{
				path: '/',
				name: 'home',
				component: HomeView
			},
			{
				path: '/items',
				name: 'items',
				component: Items
			},
			{
				path: 'customers',
				name: 'customers',
				component: Customers
			},
			{
				path: 'customers/create',
				name: 'create-customer',
				component: () => import('@/views/customer/create.vue')
			},
			{
				path: '/create-invoice',
				name: 'createInvoice',
				component: CreateInvoice
			}
		]
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
