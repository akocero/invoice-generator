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
				<table class="table">
					<thead>
						<tr>
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
						<tr v-for="item in data" :key="item._id">
							<td>{{ item.name }}</td>
							<td>{{ item.description }}</td>
							<td>{{ item.unitCost }}</td>
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
			fetch('items');
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
