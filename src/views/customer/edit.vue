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
						<h5 class="card-title mb-4">Edit Customer</h5>
						<router-link
							class="btn btn-default"
							:to="{ name: 'customers' }"
							>Back</router-link
						>
					</div>
					<div v-if="error" class="alert alert-danger" role="alert">
						{{ error.message }}
					</div>
					<form @submit.prevent="handleSubmit" v-if="item">
						<div class="row">
							<div class="mb-3 col-6">
								<BaseInputField
									id="input_code"
									label="First Name"
									v-model="item.firstName"
									:error="error"
									:errorField="
										error?.errors?.firstName || null
									"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="input_code"
									label="Last Name"
									v-model="item.lastName"
									:error="error"
									:errorField="
										error?.errors?.lastName || null
									"
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
							<div class="mb-3 col-6">
								<BaseInputField
									id="streetAddress"
									label="Street Address"
									v-model="item.streetAddress"
									:error="error"
									:errorField="
										error?.errors?.streetAddress || null
									"
									placeholder="Ex. "
									:required="false"
								/>
							</div>

							<div class="mb-3 col-6">
								<BaseInputField
									id="state"
									label="State"
									v-model="item.state"
									:error="error"
									:errorField="error?.errors?.state || null"
									placeholder="Ex. "
									:required="false"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="city"
									label="City"
									v-model="item.city"
									:error="error"
									:errorField="error?.errors?.city || null"
									placeholder="Ex. "
									:required="false"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="zipCode"
									label="Zip Code"
									v-model="item.zipCode"
									:error="error"
									:errorField="error?.errors?.zipCode || null"
									placeholder="Ex. "
									:required="false"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="input_code"
									label="Mobile No."
									v-model="item.mobileNumber"
									:error="error"
									:errorField="
										error?.errors?.mobileNumber || null
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
		const {
			item,
			error: errorData,
			load
		} = getItem(route.params.id, 'customers');
		const router = useRouter();
		const { response, error, update, loading, unknownError } = useData();

		onBeforeMount(async () => {
			await load();

			console.log(item.value);
		});

		const handleSubmit = async () => {
			error.value = null;

			const res = await update(
				'customers/' + route.params.id,
				item.value
			);

			if (!error.value) {
				router.push({
					name: 'customers'
				});
			} else {
				// pushAlert("error", "Invalid Inputs");
			}
		};

		return {
			item,
			handleSubmit,
			error,
			loading
		};
	}
};
</script>

<style></style>
