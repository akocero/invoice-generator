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
				<div class="mb-3">
					<label for="exampleFormControlInput1" class="form-label"
						>Search</label
					>
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
							<th scope="col">Email</th>
							<th scope="col" class="table-sort">
								Customer Name
								<span @click="sort('lastName')"
									><i
										v-html="iconUp"
										v-if="sortByLastName"
									></i>
									<i v-html="iconDown" v-else></i
								></span>
							</th>
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
						<tr v-for="item in filteredData" :key="item._id">
							<td>{{ item.email }}</td>
							<td>{{ item.lastName }}, {{ item.firstName }}</td>
							<td>{{ item.mobileNumber }}</td>
							<td>
								{{
									moment(item.createdAt).format('MM/DD/YYYY')
								}}
							</td>
							<td>
								<router-link
									class="btn btn-sm btn-default"
									:to="{
										name: 'edit-customer',
										params: { id: item._id }
									}"
								>
									<i v-html="iconEdit"></i>
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
import feather from 'feather-icons';

export default {
	components: {},
	computed: {
		iconUp: function () {
			return feather.icons['chevron-up'].toSvg({
				width: 18
			});
		},
		iconDown: function () {
			return feather.icons['chevron-down'].toSvg({
				width: 18
			});
		},
		iconEdit: function () {
			return feather.icons['edit'].toSvg({
				width: 16
			});
		}
	},
	setup() {
		const { data, error, fetch, isPending } = useFetch();
		const search = ref('');
		const sortByLastName = ref(false);

		onBeforeMount(() => {
			fetchAll();
		});

		const fetchAll = () => {
			search.value = '';
			fetch('customers');
		};

		const sort = (by) => {
			data.value.sort((a, b) => {
				let fa = a[by].toLowerCase(),
					fb = b[by].toLowerCase();
				if (sortByLastName.value) {
					if (fa < fb) {
						return -1;
					}
					if (fa > fb) {
						return 1;
					}
				} else {
					if (fa < fb) {
						return 1;
					}
					if (fa > fb) {
						return -1;
					}
				}

				return 0;
			});

			sortByLastName.value = !sortByLastName.value;
		};

		const filteredData = computed(() => {
			console.log(search.value);
			if (data.value?.length) {
				return data.value.filter((item) => {
					return (
						item.firstName
							.toLowerCase()
							.match(search.value.toLowerCase()) ||
						item.lastName
							.toLowerCase()
							.match(search.value.toLowerCase()) ||
						item.email
							.toLowerCase()
							.match(search.value.toLowerCase()) ||
						item.mobileNumber
							.toLowerCase()
							.match(search.value.toLowerCase()) ||
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
			filteredData,
			sort,
			sortByLastName
		};
	}
};
</script>

<style></style>
