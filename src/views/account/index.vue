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
						<h5 class="card-title mb-4">Account Info</h5>
						<router-link
							class="btn btn-default"
							:to="{ name: 'customers' }"
							>Back</router-link
						>
					</div>
					<div
						v-if="isAccounInfoChanged"
						class="alert alert-info"
						role="alert"
					>
						Account info successfully changed, please try to
						re-login to see changes!
					</div>
					<div v-if="error" class="alert alert-danger" role="alert">
						{{ error.message }}
					</div>
					<form @submit.prevent="handleSubmit" v-if="item">
						<div class="row">
							<div class="mb-3 col-6">
								<BaseInputField
									id="name"
									label="Name"
									v-model="item.name"
									:error="error"
									:errorField="error?.errors?.name || null"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="input_code"
									type="email"
									label="Email"
									v-model="item.email"
									:error="error"
									:errorField="error?.errors?.email || null"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-12">
								<input
									class="btn btn-success"
									value="Save Changes"
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

export default {
	components: {
		BaseInputField,
		BaseTextAreaField
	},
	setup() {
		const route = useRoute();
		const { item, error: errorData, load } = getItem('', 'auth/me');
		const router = useRouter();
		const { response, error, update, loading, unknownError } = useData();
		const isAccounInfoChanged = ref(false);

		onBeforeMount(async () => {
			await load();

			console.log(item.value);
		});

		const handleSubmit = async () => {
			error.value = null;

			console.log(item.value);

			const res = await update('auth/updateMe', item.value);

			if (!error.value) {
				// router.push({
				// 	name: 'customers'
				// });
				isAccounInfoChanged.value = true;
			} else {
				// isAccounInfoChanged.value = true;
				// pushAlert("error", "Invalid Inputs");
			}
		};

		return {
			item,
			handleSubmit,
			error,
			loading,
			isAccounInfoChanged
		};
	}
};
</script>

<style></style>
