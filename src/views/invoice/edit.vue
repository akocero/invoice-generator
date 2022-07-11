<template>
	<div class="create-invoice mx-auto" style="margin-top: 2rem">
		<div class="row" v-if="item">
			<div class="col-7">
				<div class="card border-0">
					<div class="card-body p-4">
						<div
							class="d-flex justify-content-between align-items-baseline"
						>
							<h5 class="card-title mb-4">Edit Invoice</h5>
						</div>
						<div
							v-if="error"
							class="alert alert-danger"
							role="alert"
						>
							{{ error.message }}
						</div>

						<form @submit.prevent="handleSubmit">
							<div class="row">
								<div class="mb-3 col-6">
									<BaseInputField
										id="name"
										label="Invoice #"
										v-model="item.invoiceNo"
										:error="error"
										:errorField="
											error?.errors.invoiceNo || null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseSelectField
										id="payableTo"
										label="Payable to"
										v-model="item.payableTo"
										:error="error"
										:errorField="
											error?.errors?.payableTo || null
										"
										:options="[
											{
												value: 'Papier Renei',
												label: 'Papier Renei'
											}
										]"
										:required="true"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseSelectField
										id="payableTo"
										label="Invoice Status"
										v-model="item.status"
										:error="error"
										:errorField="
											error?.errors?.payableTo || null
										"
										:options="[
											{
												value: 'unsettled',
												label: 'Unsettled'
											},
											{
												value: 'paid',
												label: 'Paid'
											},
											{
												value: 'overdue',
												label: 'Overdue'
											}
										]"
										:required="true"
									/>
								</div>
								<div
									class="mb-3 col-6"
									v-if="item.status === 'paid'"
								>
									<BaseInputField
										type="date"
										id="datePaid"
										label="Date Paid"
										v-model="item.datePaid"
										:error="error"
										:errorField="
											error?.errors?.datePaid || null
										"
										placeholder="Ex. ABC"
										:required="false"
									/>
								</div>
								<div class="mt-3 col-12">
									<h6>Customer Info.</h6>
								</div>
								<div class="mb-3 col-6">
									<BaseSelectField
										id="invoiceFor"
										label="Select Customer"
										v-model="invoiceFor"
										:error="error"
										:errorField="
											error?.errors?.invoiceFor || null
										"
										:options="customers"
										optionLabel="firstName"
										optionValue="_id"
										:required="true"
									/>
								</div>

								<div class="mb-3 col-6">
									<BaseInputField
										id="name"
										label="Customer Name"
										v-model="item.invoiceFor.name"
										:error="error"
										:errorField="
											error?.errors['invoiceFor.name'] ||
											null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseInputField
										id="email"
										label="Email"
										v-model="item.invoiceFor.email"
										:error="error"
										:errorField="
											error?.errors['invoiceFor.email'] ||
											null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseInputField
										id="contactNo"
										label="Contact No."
										v-model="item.invoiceFor.mobileNumber"
										:error="error"
										:errorField="
											error?.errors[
												'invoiceFor.mobileNumber'
											] || null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseInputField
										id="streetAddress"
										label="Street Address"
										v-model="item.invoiceFor.streetAddress"
										:error="error"
										:errorField="
											error?.errors?.streetAddress || null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseInputField
										id="city"
										label="City"
										v-model="item.invoiceFor.city"
										:error="error"
										:errorField="
											error?.errors?.city || null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseInputField
										id="state"
										label="State"
										v-model="item.invoiceFor.state"
										:error="error"
										:errorField="
											error?.errors?.state || null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseInputField
										id="zipCode"
										label="Zip Code"
										v-model="item.invoiceFor.zipCode"
										:error="error"
										:errorField="
											error?.errors?.zipCode || null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mt-3 col-12">
									<h6>Discount Info.</h6>
								</div>
								<div class="mb-3 col-6">
									<BaseSelectField
										id="discount"
										label="Select Discount"
										v-model="discount"
										:error="error"
										:errorField="
											error?.errors?.discount || null
										"
										optionValue="_id"
										optionLabel="code"
										:options="discounts"
										:required="true"
									/>
								</div>
								<div class="mb-3 col-6" v-if="item.discount">
									<BaseInputField
										id="discountKind"
										label="Discount Type"
										v-model="item.discount.discountKind"
										:error="error"
										:errorField="
											error?.errors?.discount || null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mb-3 col-6" v-if="item.discount">
									<BaseInputField
										id="discountValue"
										label="Discount Value"
										v-model="item.discount.discountValue"
										:error="error"
										:errorField="
											error?.errors?.discount || null
										"
										placeholder="Ex. ABC"
										:required="false"
										:disabled="true"
									/>
								</div>
								<div class="mt-3 col-12">
									<h6>Other Info.</h6>
								</div>
								<div class="mb-3 col-6">
									<BaseInputField
										type="number"
										id="shippingFee"
										label="Shipping Fee"
										v-model="item.shippingFee"
										:error="error"
										:errorField="
											error?.errors?.shippingFee || null
										"
										placeholder="Ex. ABC"
										:required="false"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseInputField
										type="date"
										id="dueDate"
										label="Due Date"
										v-model="item.dueDate"
										:error="error"
										:errorField="
											error?.errors?.dueDate || null
										"
										placeholder="Ex. ABC"
										:required="false"
									/>
								</div>
								<div class="mb-3 col-6">
									<BaseTextAreaField
										id="notes"
										label="Notes"
										v-model="item.notes"
										:error="error"
										:errorField="
											error?.errors?.notes || null
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
			<div class="col">
				<div class="card border-0">
					<div class="card-body p-4">
						<div
							v-if="errorItems"
							class="alert alert-danger"
							role="alert"
						>
							{{ errorItems }}
						</div>
						<div
							class="d-flex justify-content-between align-items-baseline"
						>
							<h5 class="card-title mb-4">Add Item</h5>
						</div>
						<div class="row">
							<div class="mb-3 col-7">
								<BaseSelectField
									id="invoiceFor"
									label="Select Item"
									v-model="selectedItem"
									:error="error"
									:errorField="error?.errors?.items || null"
									:options="items"
									optionLabel="name"
									optionValue="_id"
									:required="true"
								/>
							</div>
							<div class="mb-3 col">
								<BaseInputField
									id="qty"
									label="Quantity"
									v-model="selectedQty"
									:error="error"
									:errorField="error?.errors?.qty || null"
									placeholder="Ex. 2"
									:required="true"
									type="number"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<button
									class="btn btn-success"
									@click="addItem"
								>
									Add Item
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="card border-0 mt-4">
					<div class="card-body">
						<h5>Items</h5>
						<table class="table">
							<thead>
								<tr>
									<th scope="col">Name</th>
									<th scope="col">Qty</th>
									<th scope="col">Unit Price</th>
									<th scope="col">Unit Total</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="i in addedItems" :key="i.id">
									<th scope="row">{{ i.name }}</th>
									<td>{{ i.qty }}</td>
									<td>₱{{ i.unitPrice }}</td>
									<td>₱{{ i.unitPrice * i.qty }}</td>
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
										{{ addedItemsTotal }}
										<!-- <strong
											>₱{{
												numberWithCommas(
													addedItemsTotal
												)
											}}</strong
										> -->
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
import { onMounted, ref, watch } from 'vue';
import useData from '@/composables/useData';
import useFetch from '@/composables/useFetch';
import { onBeforeRouteLeave, useRouter, useRoute } from 'vue-router';
import BaseInputField from '@/components/BaseInputField';
import BaseTextAreaField from '@/components/BaseTextAreaField';
import BaseSelectField from '@/components/BaseSelectField';
import { onBeforeMount } from '@vue/runtime-core';
import getItem from '@/composables/getItem';
import moment from 'moment';

export default {
	components: {
		BaseInputField,
		BaseTextAreaField,
		BaseSelectField
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		const { response, error, update, loading, unknownError } = useData();
		const { data: items, fetch: loadItems } = useFetch();
		const { data: discounts, fetch: loadDiscounts } = useFetch();
		const { data: customers, fetch: loadCustomers } = useFetch();
		const {
			item,
			error: errorData,
			load
		} = getItem(route.params.id, 'invoices');
		const selectedItem = ref('');
		const selectedQty = ref('');
		const addedItems = ref([]);
		const addedItemsTotal = ref(0);
		const errorItems = ref('');
		const invoiceFor = ref('');
		const discount = ref('');

		onBeforeMount(async () => {
			await load();
			await loadItems('items');
			await loadCustomers('customers');
			if (item.value.items.length) {
				addedItems.value = item.value.items;
			}

			item.value.dueDate = item.value.dueDate.substring(0, 10);
			item.value.datePaid = item.value.datePaid
				? item.value.datePaid.substring(0, 10)
				: undefined;
			console.log(item.value.dueDate);
			await loadDiscounts('discounts');
		});

		const handleSubmit = async () => {
			// console.log(item.value.dueDate);
			error.value = null;
			errorItems.value = null;

			if (!addedItems.value.length) {
				errorItems.value = 'Please add items';
				return false;
			}

			item.value.items = addedItems.value;

			if (item.value.status === 'paid') {
				if (item.value.datePaid) {
					item.value.datePaid.substring(0, 10);
				} else {
					console.log(item.value.status, item.value.datePaid);
					error.value = {
						errors: { datePaid: 'Date paid is required' },
						message: 'Invalid Inputs!'
					};
					return false;
				}
			}
			const res = await update('invoices/' + route.params.id, item.value);

			if (!error.value) {
				router.push({
					name: 'invoices'
				});
			} else {
				// pushAlert("error", "Invalid Inputs");
			}
		};

		const addItem = () => {
			errorItems.value = '';

			if (!selectedQty.value || selectedQty.value <= 0) {
				errorItems.value = 'Please add quantity';

				return false;
			}
			const _item = items.value.find(
				(item) => item._id === selectedItem.value
			);

			const isItemExist = addedItems.value.find(
				(el) => _item.name === el.name
			);
			console.log(_item);
			if (!isItemExist) {
				addedItems.value.push({
					id: _item._id,
					name: _item.name,
					unitPrice: _item.unitCost,
					qty: selectedQty.value
				});
			} else {
				errorItems.value = 'Item is already added';
				return false;
			}

			selectedItem.value = '';
			selectedQty.value = '';
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

		watch(invoiceFor, (newInvoiceFor) => {
			if (newInvoiceFor) {
				const _selectedInvoiceFor = customers.value.find(
					(item) => item._id === newInvoiceFor
				);
				item.value.invoiceFor = _selectedInvoiceFor;
				item.value.invoiceFor.name = `${_selectedInvoiceFor.firstName} ${_selectedInvoiceFor.lastName}`;
			} else {
				item.value.invoiceFor = {};
			}

			console.log(item.value.invoiceFor);
		});

		watch(discount, (newDiscount) => {
			if (newDiscount) {
				const _selectedDiscount = discounts.value.find(
					(item) => item._id === newDiscount
				);
				item.value.discount = _selectedDiscount;
			} else {
				item.value.discount = {};
			}
		});

		return {
			handleSubmit,
			item,
			error,
			loading,
			items,
			selectedItem,
			selectedQty,
			addedItems,
			addItem,
			deleteAddedItem,
			addedItemsTotal,
			errorItems,
			customers,
			invoiceFor,
			discounts,
			discount
		};
	}
};
</script>

<style></style>
