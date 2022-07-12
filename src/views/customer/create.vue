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
						<h5 class="card-title mb-4">Create Customer</h5>
						<router-link
							class="btn btn-default"
							:to="{ name: 'customers' }"
							>Back</router-link
						>
					</div>
					<div v-if="error" class="alert alert-danger" role="alert">
						{{ error.message }}
					</div>
					<form @submit.prevent="handleSubmit">
						<div class="row">
							<!-- <div class="mb-3 col-6">
								<label for="" class="form-label"
									>Customers</label
								>
								<select
									class="form-select"
									aria-label="Default select example"
									required
									v-model="customer"
								>
									<option selected value="">Select...</option>

									<option
										:value="itemCustomer.id"
										v-for="itemCustomer in customers"
										:key="itemCustomer.id"
									>
										{{ itemCustomer.name }}
									</option>
								</select>
							</div> -->

							<div class="mb-3 col-6">
								<!-- <label
									for="exampleFormControlInput1"
									class="form-label"
									>First Name</label
								>
								<input
									v-model="firstName"
									type="text"
									class="form-control"
									id="exampleFormControlInput1"
								/> -->

								<BaseInputField
									id="input_code"
									label="First Name"
									v-model="firstName"
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
									v-model="lastName"
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
									v-model="email"
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
									v-model="streetAddress"
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
									v-model="state"
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
									v-model="city"
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
									v-model="zipCode"
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
									v-model="mobileNumber"
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
									value="Save"
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
import { ref } from 'vue';
import useData from '@/composables/useData';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import BaseInputField from '@/components/BaseInputField';
import BaseTextAreaField from '@/components/BaseTextAreaField';

export default {
	components: {
		BaseInputField,
		BaseTextAreaField
	},
	setup() {
		const router = useRouter();
		const { response, error, create, loading, unknownError } = useData();

		const email = ref('');
		const firstName = ref('');
		const lastName = ref('');
		const streetAddress = ref('');
		const state = ref('');
		const city = ref('');
		const zipCode = ref('');
		const mobileNumber = ref('');

		const handleSubmit = async () => {
			error.value = null;

			const data = {
				email: email.value,
				firstName: firstName.value,
				lastName: lastName.value,
				streetAddress: streetAddress.value,
				mobileNumber: mobileNumber.value,
				state: state.value,
				zipCode: zipCode.value,
				city: city.value
			};

			const res = await create('customers', data);

			if (!error.value) {
				router.push({
					name: 'customers'
				});
				console.log('opk nasndnsa');
			} else {
				// pushAlert("error", "Invalid Inputs");
			}
		};

		return {
			handleSubmit,
			email,
			firstName,
			lastName,
			streetAddress,
			mobileNumber,
			state,
			zipCode,
			city,
			error,
			loading
		};
	}
};
</script>

<style></style>
