<template>
	<div class="items" style="margin-top: 2rem">
		<div class="card border-0">
			<div class="card-body p-4">
				<div
					class="d-flex justify-content-between align-items-baseline"
				>
					<h5 class="card-title mb-4">Discounts</h5>
					<router-link
						:to="{ name: 'create-discount' }"
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
							<th scope="col">Code</th>
							<th scope="col">Type</th>
							<th scope="col">Value</th>
							<th scope="col">Created At</th>
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
							<td>{{ item.code }}</td>
							<td>{{ item.discountKind }}</td>
							<td v-if="item.discountKind === 'percent'">
								{{ item.discountValue }}%
							</td>
							<td v-else>₱{{ item.discountValue }}</td>
							<td>
								{{
									moment(item.createdAt).format('MM/DD/YYYY')
								}}
							</td>
							<td>
								<router-link
									class="btn btn-sm btn-outline-secondary"
									:to="{
										name: 'edit-discount',
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
			fetch('discounts');
		};

		const filteredData = computed(() => {
			console.log(search.value);
			if (data.value?.length) {
				return data.value.filter((item) => {
					return (
						item.code
							.toLowerCase()
							.match(search.value.toLowerCase()) ||
						item.discountKind
							.toLowerCase()
							.match(search.value.toLowerCase()) ||
						item.discountValue.toString().match(search.value) ||
						moment(item.createdAt)
							.format('MM/DD/YYYY')
							.toLowerCase()
							.match(search.value.toLowerCase())
					);
				});
			}
		});

		return {
			data,
			error,
			isPending,
			search,
			fetchAll,
			moment,
			filteredData
		};
	}
};
</script>

<style></style>
