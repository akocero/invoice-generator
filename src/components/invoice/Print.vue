<template>
	<div id="print-table" v-if="item">
		<div class="row" v-if="item">
			<div class="col-5">
				<h2>Papier Renei</h2>
				<p>
					Blk 16 Lot 5 Phase E1A Francisco Homes-Mulawin City of San
					Jose del Monte Bulacan, 3023 09266151516
				</p>

				<h1>Invoice</h1>
				<label
					>Sent on
					{{ moment(Date.now()).format('MM/DD/YYYY') }}
				</label>
			</div>
			<div class="col-6">
				<div class="img-container">
					<img src="../../assets/logo.png" alt="" />
				</div>
			</div>
		</div>

		<div class="row pt-3">
			<div class="col">
				<label for="">Invoice for:</label>
				<p>
					{{ item?.invoiceFor?.name || '' }} <br />
					{{ item?.invoiceFor?.streetAddress || '' }} <br />
					{{ item?.invoiceFor?.state || '' }} <br />
					{{ item?.invoiceFor?.city || '' }} <br />
					{{ item?.invoiceFor?.email || '' }} <br />
					{{ item?.invoiceFor?.mobileNumber || '' }}
				</p>
			</div>
			<div class="col">
				<label for="">Payable to:</label>
				<p>{{ item.payableTo }}</p>
			</div>
			<div class="col-3">
				<label for="">Invoice #:</label>
				<p>{{ item.invoiceNo }}</p>
				<label for="">Due date:</label>
				<p>{{ moment(item.dueDate).format('MM/DD/YYYY') }}</p>
				<label for="">Status:</label>
				<p class="pb-0 text-uppercase">
					<span
						:class="
							item.status === 'paid'
								? 'text-success'
								: item.status === 'unsettled'
								? 'text-custom-warning'
								: 'text-danger'
						"
						>{{ item.status }}</span
					>
					<br />
					<span v-if="item.status === 'paid'" class="pt-0">
						{{ moment(item.datePaid).format('MM/DD/YYYY') }}
					</span>
					<span v-else class="pt-0">TO BE PAID</span>
				</p>
			</div>
		</div>
		<table class="table mt-3">
			<thead>
				<tr>
					<th scope="col" style="width: 5%">#</th>
					<th scope="col">Item Name</th>
					<th scope="col" style="width: 20%">Qty</th>
					<th scope="col" style="width: 20%">Unit price</th>
					<th scope="col" style="width: 20%">Total price</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(itemDetails, index) in item.items"
					:key="itemDetails._id"
				>
					<td>{{ index + 1 }}</td>
					<td>{{ itemDetails.name }}</td>
					<td>{{ itemDetails.qty }}</td>
					<td>₱{{ numberFormat(itemDetails.unitPrice) }}</td>
					<td>
						₱{{
							numberFormat(
								itemDetails.unitPrice * itemDetails.qty
							)
						}}
					</td>
				</tr>
				<tr>
					<td colspan="3" class="border-bottom-0 p-0">&nbsp;</td>
					<td colspan="10" class="p-0">&nbsp;</td>
				</tr>
				<tr>
					<td colspan="3" class="border-bottom-0"></td>
					<td>Subtotal</td>
					<td>₱{{ subtotal }}</td>
				</tr>
				<tr v-if="item.shippingFee">
					<td colspan="3" class="border-bottom-0"></td>
					<td>Shipping Fee</td>
					<td>₱{{ item.shippingFee }}</td>
				</tr>
				<tr
					v-if="
						item.discount &&
						item.discount.discountKind === 'percent'
					"
				>
					<td colspan="3" class="border-bottom-0"></td>
					<td>Disc Code</td>
					<td>{{ item.discount.code }} ({{ discountPercent }}%)</td>
				</tr>
				<tr
					v-if="
						item.discount && item.discount.discountKind === 'amount'
					"
				>
					<td colspan="3" class="border-bottom-0"></td>
					<td>Disc Code</td>
					<td>{{ item.discount.code }}</td>
				</tr>
				<tr v-if="item.discount">
					<td colspan="3" class="border-bottom-0"></td>
					<td>Discount</td>
					<td class="text-danger">- ₱ {{ discount }}</td>
				</tr>
				<tr>
					<td colspan="3" class="border-bottom-0"></td>
					<td>Total</td>
					<td>₱{{ computeAll(item) }}</td>
				</tr>
			</tbody>
		</table>
		<div class="row">
			<p v-if="!item.notes">Note:</p>
			<p v-if="item.notes">Note: <br />{{ item.notes }}</p>
		</div>
		<div class="row pt-2">
			<p>Mode of Payment:</p>
			<div class="col-3">
				<p>GCash</p>
				<p>
					Reneilda D <br />
					0926 615 1516
				</p>
			</div>
			<div class="col">
				<p>BPI Family Savings</p>
				<p>
					Reneilda de Leon <br />
					2289 3651 87
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';
export default {
	props: ['item'],
	setup() {
		// const commputeDiscount = computed(() => {
		// 	if (item.value && item.value?.discount?.code) {
		// 		return item.value?.discount?.code;
		// 	}
		// });

		const total = ref(0);
		const subtotal = ref(0);
		const discount = ref(0);
		const discountPercent = ref(0);

		const computeAll = (item) => {
			let _subtotal = 0;
			let _total = 0;
			let _discount = 0;
			if (item) {
				item.items.forEach((property) => {
					_subtotal +=
						parseFloat(property.unitPrice) *
						parseFloat(property.qty);
				});

				_total = _subtotal;
			}

			if (item.shippingFee) {
				_total += parseFloat(item.shippingFee);
			}

			if (item.discount && item.discount.discountKind === 'percent') {
				const _percent = parseFloat(item.discount.discountValue) / 100;
				_discount = _subtotal * _percent;
				_total -= _discount;

				discountPercent.value = _percent * 100;
				discount.value = numberFormat(_discount);
			}

			if (item.discount && item.discount.discountKind === 'amount') {
				_total -= parseFloat(item.discount.discountValue);

				discount.value = numberFormat(
					parseFloat(item.discount.discountValue)
				);
			}

			subtotal.value = numberFormat(_subtotal);
			total.value = _total;
			console.log(_subtotal);

			return numberFormat(total.value);
		};

		const numberFormat = (value) => {
			return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
				minimumFractionDigits: 2
			});
		};

		return {
			moment,
			computeAll,
			subtotal,
			discount,
			discountPercent,
			numberFormat
		};
	}
};
</script>

<style scoped>
#print-table {
	padding: 2rem;
	color: #6eccff !important;
	font-size: 0.9rem;
	font-family: 'Comfortaa';
}

#print-table h1,
#print-table h2 {
	font-weight: 700;
}
#print-table label {
	font-weight: bolder !important;
	font-size: 1.4rem !important;
}
#print-table p {
	color: #6c6f73 !important;
}

#print-table table th {
	color: #6eccff !important;
	font-weight: 700;
}

.img-container {
	position: relative;
	max-width: 16rem !important;
}

.img-container > img {
	position: absolute;
	top: -2rem;
	right: -10rem;
	bottom: 0 !important;
	width: 100%;
}

.table > :not(:first-child) {
	border-top: 0px solid black;
}

.text-custom-warning {
	color: #d49a06 !important;
}
</style>
