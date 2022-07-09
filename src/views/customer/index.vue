<template>
	<div class="items" style="margin-top: 2rem">
		<div class="card border-0">
			<div class="card-body p-4">
				<div
					class="d-flex justify-content-between align-items-baseline"
				>
					<h5 class="card-title mb-4">Customers</h5>
					<router-link
						:to="{ name: 'create-customer' }"
						class="btn btn-primary"
						>Add New</router-link
					>
				</div>
				<table class="table">
					<thead>
						<tr>
							<th scope="col">Email</th>
							<th scope="col">Customer Name</th>
							<th scope="col">Address</th>
							<th scope="col">Mobile No.</th>
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
						<tr v-for="item in data" :key="item._id">
							<td>{{ item.email }}</td>
							<td>{{ item.lastName }}, {{ item.firstName }}</td>
							<td>{{ item.homeAddress }}</td>
							<td>{{ item.mobileNumber }}</td>
							<td>{{ item.createdAt }}</td>
							<td>
								<button
									class="btn btn-sm btn-outline-secondary"
								>
									Delete
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
// import { router-link } from "vue-router"
import useFetch from '@/composables/useFetch';

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
			fetch('customers');
		};

		return {
			data,
			error,
			isPending,
			search,
			fetchAll
		};
	}
};
</script>

<style></style>
