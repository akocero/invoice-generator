<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-white">
		<div class="container-fluid">
			<router-link to="/" class="navbar-brand">
				<img src="../assets/logo.png" alt="" width="30" height="30" />
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
						<router-link :to="{ name: 'invoices' }" class="nav-link"
							>Invoices</router-link
						>
					</li>
					<li class="nav-item">
						<router-link
							:to="{ name: 'discounts' }"
							class="nav-link"
							>Discounts</router-link
						>
					</li>
				</ul>
				<ul class="navbar-nav">
					<div class="nav-item dropstart">
						<button
							type="button"
							class="btn dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{{ user.name }}
						</button>
						<ul
							class="dropdown-menu"
							aria-labelledby="navbarDropdown"
						>
							<li>
								<router-link
									:to="{ name: 'account' }"
									class="dropdown-item"
									>Account Info</router-link
								>
							</li>
							<li>
								<router-link
									:to="{ name: 'security' }"
									class="dropdown-item"
									>Security</router-link
								>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<li>
								<a
									class="dropdown-item text-danger"
									href="#"
									@click="logout"
									>Logout</a
								>
							</li>
						</ul>
					</div>
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
