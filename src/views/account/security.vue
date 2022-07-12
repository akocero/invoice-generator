<template>
	<div
		class="create-invoice mx-auto"
		style="margin-top: 2rem; max-width: 58rem"
	>
		<div class="row">
			<div class="card border-0">
				<div class="card-body p-4">
					<div
						class="d-flex justify-content-between align-items-baseline"
					>
						<h5 class="card-title mb-4">Security Info</h5>
						<router-link
							class="btn btn-default"
							:to="{ name: 'home' }"
							>Back</router-link
						>
					</div>
					<div
						v-if="isAccounSecurityChanged"
						class="alert alert-info"
						role="alert"
					>
						Password successfully changed, the system will logged
						you out in 3 seconds!
					</div>
					<div v-if="error" class="alert alert-danger" role="alert">
						{{ error.message }}
					</div>
					<form @submit.prevent="handleSubmit">
						<div class="row">
							<div class="mb-3 col-6">
								<BaseInputField
									id="password"
									type="password"
									label="Current Password"
									v-model="password"
									:error="error"
									:errorField="
										error?.errors?.password || null
									"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
							<div class="mt-3 col-12">
								<h6>New Password Info.</h6>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="newPassword"
									type="password"
									label="New Password"
									v-model="newPassword"
									:error="error"
									:errorField="
										error?.errors?.newPassword || null
									"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="passwordConfirm"
									type="password"
									label="Password Confirm"
									v-model="passwordConfirm"
									:error="error"
									:errorField="
										error?.errors?.passwordConfirm || null
									"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-12">
								<input
									class="btn btn-success"
									value="Submit"
									type="submit"
									v-if="!loading"
								/>
								<input
									class="btn btn-success"
									value="Saving..."
									type="submit"
									disabled
									v-else
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import useData from '@/composables/useData';
import { onBeforeRouteLeave, useRouter, useRoute } from 'vue-router';
import BaseInputField from '@/components/BaseInputField';
import BaseTextAreaField from '@/components/BaseTextAreaField';
import getItem from '@/composables/getItem';
import { useStore } from 'vuex';

export default {
	components: {
		BaseInputField,
		BaseTextAreaField
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore();
		const { response, error, update, loading, unknownError } = useData();
		const isAccounSecurityChanged = ref(false);
		const newPassword = ref('');
		const password = ref('');
		const passwordConfirm = ref('');
		onBeforeMount(async () => {});

		const handleSubmit = async () => {
			error.value = null;

			const data = {
				password: password.value,
				newPassword: newPassword.value,
				passwordConfirm: passwordConfirm.value
			};

			const res = await update('auth/updatePassword', data);

			if (!error.value) {
				// router.push({
				// 	name: 'customers'
				// });
				isAccounSecurityChanged.value = true;

				setTimeout(() => {
					store.commit('removeUser');
					store.commit('removeToken');
					window.location.reload();
				}, 4000);
			} else {
				// isAccounSecurityChanged.value = true;
				// pushAlert("error", "Invalid Inputs");
			}
		};

		return {
			handleSubmit,
			error,
			loading,
			isAccounSecurityChanged,
			newPassword,
			password,
			passwordConfirm
		};
	}
};
</script>

<style></style>
