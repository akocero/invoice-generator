<template>
	<div class="items" style="margin-top: 2rem">
		<div class="card border-0">
			<div class="card-body p-4">
				<div
					class="d-flex justify-content-between align-items-baseline"
				>
					<h5 class="card-title mb-4">Items</h5>
					<router-link
						:to="{ name: 'create-item' }"
						class="btn btn-primary"
						>Add New</router-link
					>
				</div>
				<div class="mb-3">
					<label class="form-label">Search</label>
					<input
						type="text"
						v-model="search"
						class="form-control"
						id="search"
						placeholder="Type any item in the table below"
					/>
				</div>
				<table class="table">
					<thead>
						<tr>
							<th scope="col">SKU</th>
							<th scope="col">Name</th>
							<th scope="col">Description</th>
							<th scope="col">Unit Cost</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody v-if="isPending">
						<tr>
							<td colspan="10" class="text-center">
								Loading Data...
							</td>
						</tr>
					</tbody>
					<tbody v-if="!isPending">
						<tr v-for="item in filteredData" :key="item._id">
							<td>{{ item.sku ? item.sku : 'N/A' }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.description }}</td>
							<td>₱{{ numberFormat(item.unitCost) }}</td>
							<td>
								<router-link
									class="btn btn-sm btn-outline-secondary"
									:to="{
										name: 'edit-item',
										params: { id: item._id }
									}"
								>
									Edit
								</router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onBeforeMount, computed } from 'vue';
// import { router-link } from "vue-router"
import useFetch from '@/composables/useFetch';
import moment from 'moment';

export default {
	components: {},
	setup() {
		const { data, error, fetch, isPending } = useFetch();
		const search = ref('');

		onBeforeMount(() => {
			fetchAll();
		});

		const fetchAll = () => {
			search.value = '';
			fetch('items');
		};

		const filteredData = computed(() => {
			console.log(search.value);
			if (data.value?.length) {
				return data.value.filter((item) => {
					return (
						item.name
							.toLowerCase()
							.match(search.value.toLowerCase()) ||
						item.description
							.toLowerCase()
							.match(search.value.toLowerCase()) ||
						item.unitCost.toString().match(search.value) ||
						moment(item.createdAt)
							.format('MM/DD/YYYY')
							.toLowerCase()
							.match(search.value.toLowerCase())
					);
				});
			}
		});

		const numberFormat = (value) => {
			return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
				minimumFractionDigits: 2
			});
		};

		return {
			data,
			error,
			isPending,
			search,
			fetchAll,
			filteredData,
			moment,
			numberFormat
		};
	}
};
</script>

<style></style>
