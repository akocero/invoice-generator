<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-white">
		<div class="container-fluid">
			<router-link to="/" class="navbar-brand"
				><strong>papierenei</strong>
			</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<!-- <a class="nav-link" href="#">Items</a> -->
						<router-link :to="{ name: 'items' }" class="nav-link"
							>Items</router-link
						>
					</li>
					<li class="nav-item">
						<router-link
							:to="{ name: 'customers' }"
							class="nav-link"
							>Customers</router-link
						>
					</li>
					<li class="nav-item">
						<router-link to="/create-invoice" class="nav-link"
							>Create Invoice</router-link
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link disabled"
							href="#"
							tabindex="-1"
							aria-disabled="true"
							>Disabled</a
						>
					</li>
				</ul>
				<ul class="navbar-nav">
					<li class="nav-item" v-if="!user">
						<router-link to="/signup" class="nav-link"
							>Sign Up</router-link
						>
					</li>
					<li class="nav-item" v-if="!user">
						<router-link to="/login" class="nav-link"
							>Log In</router-link
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link text-danger"
							role="button"
							@click="logout"
						>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
	name: 'Navbar',
	setup() {
		const store = useStore();
		const user = computed(() => store.getters.getUser);

		const logout = () => {
			if (confirm('Are you sure you want to sign out?')) {
				store.commit('removeUser');
				store.commit('removeToken');
				window.location.reload();
			}
		};

		return { logout, user };
	}
};
</script>

<style></style>
