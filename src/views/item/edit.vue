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
						<h5 class="card-title mb-4">Edit Item</h5>
						<router-link
							class="btn btn-default"
							:to="{ name: 'items' }"
							>Back</router-link
						>
					</div>
					<div v-if="error" class="alert alert-danger" role="alert">
						{{ error.message }}
					</div>
					<form @submit.prevent="handleSubmit" v-if="item">
						<div class="row">
							<!-- <div class="mb-3 col-6">
								<label for="" class="form-label"
									>Customers</label
								>
								<select
									class="form-select"
									aria-label="Default select example"
									required
									v-model="item.customer"
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
									v-model="item.name"
									type="text"
									class="form-control"
									id="exampleFormControlInput1"
								/> -->

								<BaseInputField
									id="name"
									label="Item Name"
									v-model="item.name"
									:error="error"
									:errorField="error?.errors?.name || null"
									placeholder="Ex. ABC"
									:required="true"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="unitCost"
									type="number"
									label="Unit Cost"
									v-model="item.unitCost"
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
									v-model="item.description"
									:error="error"
									:errorField="
										error?.errors?.description || null
									"
									placeholder="Ex. "
									:required="false"
								/>
							</div>
							<div class="mb-3 col-6">
								<BaseInputField
									id="quantity"
									label="Quantity"
									v-model="item.quantity"
									:error="error"
									:errorField="
										error?.errors?.quantity || null
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
		} = getItem(route.params.id, 'items');
		const router = useRouter();
		const { response, error, update, loading, unknownError } = useData();

		onBeforeMount(async () => {
			await load();

			console.log(item.value);
		});

		const handleSubmit = async () => {
			error.value = null;

			const res = await update('items/' + route.params.id, item.value);

			if (!error.value) {
				router.push({
					name: 'items'
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
