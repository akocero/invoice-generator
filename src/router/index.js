import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import CreateInvoice from '../views/CreateInvoice.vue';
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
		component: () =>
			import(/* webpackChunkName: "about" */ '../components/Main.vue'),
		beforeEnter: authRequired,
		children: [
			{
				path: '/',
				name: 'home',
				component: HomeView
			},
			{
				path: 'customers',
				name: 'customers',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/customer/index.vue'
					)
			},
			{
				path: 'customers/create',
				name: 'create-customer',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/customer/create.vue'
					)
			},
			{
				path: 'customers/edit/:id',
				name: 'edit-customer',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/customer/edit.vue'
					)
			},
			{
				path: 'items',
				name: 'items',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/item/index.vue'
					)
			},
			{
				path: 'items/create',
				name: 'create-item',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/item/create.vue'
					)
			},
			{
				path: 'items/edit/:id',
				name: 'edit-item',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/item/edit.vue'
					)
			},
			{
				path: 'invoices',
				name: 'invoices',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/invoice/index.vue'
					)
			},
			{
				path: 'invoices/create',
				name: 'create-invoice',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/invoice/create.vue'
					)
			},
			{
				path: 'invoices/edit/:id',
				name: 'edit-invoice',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/invoice/edit.vue'
					)
			},
			{
				path: 'discounts',
				name: 'discounts',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/discount/index.vue'
					)
			},
			{
				path: 'discounts/create',
				name: 'create-discount',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/discount/create.vue'
					)
			},
			{
				path: 'discounts/edit/:id',
				name: 'edit-discount',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/discount/edit.vue'
					)
			},
			{
				path: 'account',
				name: 'account',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/account/index.vue'
					)
			},
			{
				path: 'account/security',
				name: 'security',
				component: () =>
					import(
						/* webpackChunkName: "about" */ '../views/account/security.vue'
					)
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

router.beforeEach((to, from, next) => {
	document.title = `Papier Renei Accounting System`;
	next();
});

export default router;
