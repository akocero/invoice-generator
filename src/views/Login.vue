<template>
	<div class="auth-container">
		<div class="auth-image"><img src="../assets/logo_t.png" alt="" /></div>
	</div>
	<div class="card p-4 border-0 mx-auto" style="width: 22%; margin-top: 1rem">
		<form @submit.prevent="handleSubmit">
			<div class="text-center py-4">
				<h5 class="tex-center">Log in to your account</h5>
			</div>

			<div v-if="error" class="alert alert-danger" role="alert">
				{{ error.message }}
			</div>
			<div class="mb-3">
				<label for="email" class="form-label">Email:</label>
				<input
					type="email"
					name="email"
					class="form-control"
					v-model="email"
					required
				/>
			</div>
			<div class="mb-3">
				<label for="email" class="form-label">Password:</label>
				<input
					type="password"
					name="password"
					class="form-control"
					v-model="password"
					required
				/>
			</div>
			<button class="btn btn-primary" disabled v-if="isPending">
				Loading...
			</button>
			<button class="btn btn-primary" v-if="!isPending">Login</button>
		</form>
	</div>
</template>

<script>
import { ref } from 'vue';
import useLogin from '@/composables/useLogin';
import { useStore } from 'vuex';
export default {
	setup() {
		const { response, error, login, isPending } = useLogin();
		const email = ref('');
		const password = ref('');
		const store = useStore();
		const handleSubmit = async () => {
			error.value = null;

			const data = {
				email: email.value.toLowerCase(),
				password: password.value
			};

			await login('auth/login', data);

			if (error.value) {
				// pushAlert('error', 'Email or Password is Incorrect!');
			} else {
				store.commit('setUser', {
					email: response.value.email,
					name: response.value.name,
					id: response.value._id
				});
				store.commit('setToken', response.value.token);
				window.location.reload();
			}
		};
		return { handleSubmit, email, password, isPending, error };
	}
};
</script>
<style>
.auth-image {
	max-width: 12%;
	margin: 0 auto;
}

.auth-image img {
	width: 100%;
}
</style>
