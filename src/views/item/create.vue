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
						<h5 class="card-title mb-4">Create Item</h5>
						<router-link
							class="btn btn-default"
							:to="{ name: 'items' }"
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
									id="name"
									label="Item Name"
									v-model="name"
									:error="error"
									:errorField="error?.errors?.name || null"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="sku"
									label="SKU"
									v-model="sku"
									:error="error"
									:errorField="error?.errors?.sku || null"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="unitCost"
									type="number"
									label="Unit Cost"
									v-model="unitCost"
									:error="error"
									:errorField="
										error?.errors?.unitCost || null
									"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseTextAreaField
									id="description"
									label="Description"
									v-model="description"
									:error="error"
									:errorField="
										error?.errors?.description || null
									"
									placeholder="Ex. "
									:required="false"
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

		const unitCost = ref('');
		const name = ref('');
		const description = ref('');
		const quantity = ref('');
		const sku = ref('');

		const handleSubmit = async () => {
			error.value = null;

			const data = {
				unitCost: unitCost.value,
				name: name.value,
				sku: sku.value,
				description: description.value
			};

			const res = await create('items', data);

			if (!error.value) {
				router.push({
					name: 'items'
				});
			} else {
				// pushAlert("error", "Invalid Inputs");
			}
		};

		return {
			handleSubmit,
			unitCost,
			name,
			description,
			sku,
			quantity,
			error,
			loading
		};
	}
};
</script>

<style></style>
