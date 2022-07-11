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
						<h5 class="card-title mb-4">Edit Discount</h5>
						<router-link
							class="btn btn-default"
							:to="{ name: 'discounts' }"
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
									id="code"
									label="Discount Code"
									v-model="item.code"
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
									v-model="item.discountKind"
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
									label="Discount Value"
									v-model="item.discountValue"
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
import BaseSelectField from '@/components/BaseSelectField';

export default {
	components: {
		BaseInputField,
		BaseTextAreaField,
		BaseSelectField
	},
	setup() {
		const route = useRoute();
		const {
			item,
			error: errorData,
			load
		} = getItem(route.params.id, 'discounts');
		const router = useRouter();
		const { response, error, update, loading, unknownError } = useData();

		onBeforeMount(async () => {
			await load();

			console.log(item.value);
		});

		const handleSubmit = async () => {
			error.value = null;

			const res = await update(
				'discounts/' + route.params.id,
				item.value
			);

			if (!error.value) {
				router.push({
					name: 'discounts'
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
