import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Items from '../views/Items.vue';
import CreateInvoice from '../views/CreateInvoice.vue';
import Customers from '../views/Customers.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/items',
		name: 'Items',
		component: Items
	},
	{
		path: '/customers',
		name: 'Customers',
		component: Customers
	},
	{
		path: '/create-invoice',
		name: 'CreateInvoice',
		component: CreateInvoice
	},
	{
		path: '/signup',
		name: 'Signup',
		component: Signup
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
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
