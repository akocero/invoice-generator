<template>
	<div
		class="card p-4 border-0 mx-auto"
		style="width: 36rem; margin-top: 5rem"
	>
		<form @submit.prevent="handleSubmit">
			<h3>Sign up</h3>
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

			<button class="btn btn-primary">Sign up</button>
		</form>
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	setup() {
		const email = ref('');
		const password = ref('');
		const handleSubmit = () => {
			console.log(email.value, password.value);
		};
		return { handleSubmit, email, password };
	}
};
</script>
