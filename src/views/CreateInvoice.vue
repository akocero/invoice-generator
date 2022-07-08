<template>
	<div class="create-invoice" style="margin-top: 2rem">
		<div class="row">
			<div class="col-md-7">
				<div class="card border-0">
					<div class="card-body p-4">
						<div
							class="d-flex justify-content-between align-items-center"
						>
							<h5 class="card-title mb-4">Generate Invoice</h5>
							<button class="btn btn-primary">
								Print Invoice
							</button>
						</div>
						<form @submit.prevent="addItem">
							<div class="row">
								<div class="mb-3 col-6">
									<label for="" class="form-label"
										>Customers</label
									>
									<select
										class="form-select"
										aria-label="Default select example"
										required
										v-model="customer"
									>
										<option selected value="">
											Select...
										</option>

										<option
											:value="itemCustomer.id"
											v-for="itemCustomer in customers"
											:key="itemCustomer.id"
										>
											{{ itemCustomer.name }}
										</option>
									</select>
								</div>
								<div class="mb-3 col-6">
									<label for="" class="form-label"
										>Payable To</label
									>
									<select
										class="form-select"
										aria-label="Default select example"
										required
										v-model="payableTo"
									>
										<option selected value="">
											Select...
										</option>

										<option
											:value="itemPayable.id"
											v-for="itemPayable in payables"
											:key="itemPayable.id"
										>
											{{ itemPayable.name }}
										</option>
									</select>
								</div>
								<div class="mb-3 col-6">
									<label
										for="exampleFormControlInput1"
										class="form-label"
										>Due Date</label
									>
									<input
										type="date"
										class="form-control"
										id="exampleFormControlInput1"
									/>
								</div>
								<div class="mb-3 col-6">
									<label
										for="exampleFormControlInput1"
										class="form-label"
										>Discount Percent</label
									>
									<input
										type="number"
										class="form-control"
										id="exampleFormControlInput1"
									/>
								</div>
								<div class="mb-3">
									<label
										for="exampleFormControlTextarea1"
										class="form-label"
										>Notes</label
									>
									<textarea
										class="form-control"
										id="exampleFormControlTextarea1"
										rows="3"
									></textarea>
								</div>
								<div class="mb-3 col-6">
									<label for="" class="form-label"
										>Items</label
									>
									<select
										class="form-select"
										aria-label="Default select example"
										required
										v-model="selectedItem"
									>
										<option selected value="">
											Select...
										</option>

										<option
											:value="itemDetail.id"
											v-for="itemDetail in items"
											:key="itemDetail.id"
										>
											{{ itemDetail.name }}
										</option>
									</select>
								</div>
								<div class="mb-3 col-6">
									<label
										for="exampleFormControlInput1"
										class="form-label"
										>Quantity</label
									>
									<input
										required
										type="number"
										class="form-control"
										id="exampleFormControlInput1"
										v-model="quantity"
									/>
								</div>
							</div>
							<div class="row">
								<div class="col-12">
									<input
										class="btn btn-success"
										value="Add Item"
										type="submit"
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="col-md-5">
				<div class="card border-0">
					<div class="card-body">
						<h5 class="card-title mb-4">Added Items</h5>
						<table class="table">
							<thead>
								<tr>
									<th scope="col">Item Name</th>
									<th scope="col">Qty</th>
									<th scope="col">Unit Price</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="i in addedItems" :key="i.id">
									<th scope="row">{{ i.name }}</th>
									<td>{{ i.qty }}</td>
									<td>
										₱{{ numberWithCommas(i.unitPrice) }}
									</td>
									<td>
										<button
											class="btn btn-sm btn-outline-secondary"
											@click="deleteAddedItem(i.id)"
										>
											Delete
										</button>
									</td>
								</tr>

								<tr v-if="addedItems.length">
									<td><strong>Total</strong></td>
									<td colspan="3">
										<strong
											>₱{{
												numberWithCommas(
													addedItemsTotal
												)
											}}</strong
										>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	setup() {
		const items = ref([
			{
				id: 1,
				name: 'item 1',
				unitPrice: 10
			},
			{
				id: 2,
				name: 'item 2',
				unitPrice: 15
			}
		]);
		const addedItems = ref([]);
		const addedItemsTotal = ref(0);
		const customers = ref([
			{
				id: 1,
				name: 'customer 1',
				details: 'customer 1 details'
			},
			{
				id: 2,
				name: 'customer 2',
				details: 'customer 2 details'
			}
		]);
		const payables = ref([
			{
				id: 1,
				name: 'payable 1',
				details: 'payable 1 details'
			},
			{
				id: 2,
				name: 'payable 2',
				details: 'payable 2 details'
			}
		]);
		const customer = ref(1);
		const payableTo = ref(1);
		const dueDate = ref('');
		const discount = ref('');
		const notes = ref('');
		const selectedItem = ref('');
		const quantity = ref('');

		const addItem = () => {
			const _item = items.value.find(
				(item) => item.id === selectedItem.value
			);
			const isItemExist = addedItems.value.find(
				(el) => _item.id === el.id
			);
			if (!isItemExist) {
				addedItems.value.push({
					id: _item.id,
					name: _item.name,
					unitPrice: _item.unitPrice,
					qty: quantity.value
				});
			} else {
				alert('already added');
			}

			selectedItem.value = '';
			quantity.value = '';
			getTotal();
		};

		const getTotal = () => {
			let _total = 0;
			addedItems.value.forEach((el) => {
				_total += el.unitPrice * el.qty;
			});

			addedItemsTotal.value = _total;
		};

		const deleteAddedItem = (id) => {
			addedItems.value = addedItems.value.filter((el) => el.id !== id);
			getTotal();
		};

		const numberWithCommas = (x) => {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		};

		return {
			addItem,
			customer,
			payableTo,
			dueDate,
			discount,
			notes,
			selectedItem,
			quantity,
			items,
			customers,
			payables,
			addedItems,
			addedItemsTotal,
			deleteAddedItem,
			numberWithCommas
		};
	}
};
</script>

<style></style>
