<template>
	<div class="items" style="margin-top: 2rem">
		<Print v-if="isPrinting" :item="printData" />
		<div class="card border-0">
			<div class="card-body p-4">
				<div
					class="d-flex justify-content-between align-items-baseline"
				>
					<h5 class="card-title mb-4">Invoices</h5>
					<router-link
						:to="{
							name: 'create-invoice',
							query: { count: data.length || 0 }
						}"
						class="btn btn-primary"
						>Add New</router-link
					>
				</div>
				<table class="table">
					<thead>
						<tr>
							<th scope="col">Invoice No</th>
							<th scope="col">Invoice For</th>
							<th scope="col">Created At</th>
							<th scope="col">Updated At</th>
							<th scope="col">Status</th>
							<th scope="col">Date Paid</th>
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
							<td>{{ item.invoiceNo }}</td>
							<td>{{ item.invoiceFor.name }}</td>
							<td>
								{{
									moment(item.createdAt).format('MM/DD/YYYY')
								}}
							</td>
							<td>
								{{
									moment(item.updatedAt).format('MM/DD/YYYY')
								}}
							</td>
							<td>
								<span
									class="badge rounded-pill bg-warning"
									v-if="item.status === 'unsettled'"
									>{{ item.status }}</span
								>
								<span
									class="badge rounded-pill bg-success"
									v-if="item.status === 'paid'"
									>{{ item.status }}</span
								>
								<span
									class="badge rounded-pill bg-danger"
									v-if="item.status === 'overdue'"
									>{{ item.status }}</span
								>
							</td>
							<td v-if="item.status === 'paid'">
								{{ moment(item.datePaid).format('MM/DD/YYYY') }}
							</td>
							<td v-else>TO BE PAID</td>
							<td>
								<router-link
									class="btn btn-sm btn-outline-secondary"
									:to="{
										name: 'edit-invoice',
										params: { id: item._id }
									}"
								>
									Edit
								</router-link>
								<button
									@click="print(item)"
									v-if="!isPrinting"
									class="btn btn-sm btn-outline-secondary"
									style="margin-left: 4px"
								>
									Print
								</button>
								<button
									v-if="isPrinting"
									class="btn btn-sm btn-outline-secondary"
								>
									Print...
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
import Print from '@/components/invoice/Print.vue';
import moment from 'moment';

export default {
	components: {
		Print
	},
	setup() {
		const { data, error, fetch, isPending } = useFetch();
		const search = ref('');
		const isPrinting = ref(false);
		const printData = ref({});

		onBeforeMount(() => {
			fetchAll();
		});

		const fetchAll = async () => {
			search.value = '';
			await fetch('invoices');
		};

		const print = (item) => {
			item.dueDate = item.dueDate.substring(0, 10);
			printData.value = item;
			isPrinting.value = true;
			setTimeout(() => {
				window.print();
				isPrinting.value = false;
			}, 500);

			return true;
		};

		return {
			data,
			error,
			isPending,
			search,
			fetchAll,
			print,
			isPrinting,
			printData,
			moment
		};
	}
};
</script>

<style>
@media print {
	body * {
		visibility: hidden;
	}
	#print-table,
	#print-table * {
		visibility: visible;
	}
	#print-table {
		position: absolute;
		left: 0;
		top: 0;
	}
}

#print-table {
	visibility: hidden;
	position: absolute;
	left: 0;
	top: 0;
}
</style>
