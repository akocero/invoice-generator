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
						<h5 class="card-title mb-4">Create Discount</h5>
						<router-link
							class="btn btn-default"
							:to="{ name: 'discounts' }"
							>Back</router-link
						>
					</div>
					<div v-if="error" class="alert alert-danger" role="alert">
						{{ error.message }}
					</div>
					<form @submit.prevent="handleSubmit">
						<div class="row">
							<div class="mb-3 col-6">
								<BaseInputField
									id="code"
									label="Discount Code"
									v-model="code"
									:error="error"
									:errorField="error?.errors?.code || null"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseSelectField
									id="discountKind"
									label="Discount Type"
									v-model="discountKind"
									:error="error"
									:errorField="
										error?.errors?.discountKind || null
									"
									:options="[
										{
											value: 'percent',
											label: 'Percent'
										},
										{
											value: 'amount',
											label: 'Amount'
										}
									]"
									:required="true"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="discountValue"
									type="number"
									label="Discount Value"
									v-model="discountValue"
									:error="error"
									:errorField="
										error?.errors?.discountValue || null
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
import BaseSelectField from '@/components/BaseSelectField';

export default {
	components: {
		BaseInputField,
		BaseTextAreaField,
		BaseSelectField
	},
	setup() {
		const router = useRouter();
		const { response, error, create, loading, unknownError } = useData();

		const discountValue = ref('');
		const code = ref('');
		const discountKind = ref('');
		const quantity = ref('');

		const handleSubmit = async () => {
			error.value = null;

			const data = {
				discountValue: discountValue.value,
				code: code.value,
				discountKind: discountKind.value
			};

			const res = await create('discounts', data);

			if (!error.value) {
				router.push({
					name: 'discounts'
				});
			} else {
				// pushAlert("error", "Invalid Inputs");
			}
		};

		return {
			handleSubmit,
			discountValue,
			code,
			discountKind,
			error,
			loading
		};
	}
};
</script>

<style></style>
