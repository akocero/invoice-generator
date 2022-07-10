<template>
	<div id="print-table" v-if="item">
		<div class="row" v-if="item">
			<div class="col-5">
				<h2>Papier Renei</h2>
				<p>
					Blk 0 Lot 0 Phase 0 Francisco Homes-Mulawin City of San Jose
					del Monte Bulacan, 3023 639200000000
				</p>

				<h1>Invoice</h1>
				<label>Sent on current date</label>
			</div>
			<div class="col">
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
				<p>{{ item.dueDate }}</p>
				<label for="">Status:</label>
				<p>{{ item.status }}</p>
			</div>
		</div>
		<table class="table mt-3">
			<thead>
				<tr>
					<th scope="col" style="width: 5%">#</th>
					<th scope="col">Description</th>
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
					<td>₱{{ itemDetails.unitPrice }}</td>
					<td>₱{{ itemDetails.unitPrice * itemDetails.qty }}</td>
				</tr>
				<tr>
					<td colspan="10">&nbsp;</td>
				</tr>
				<tr>
					<td colspan="3"></td>
					<td>Subtotal</td>
					<td>₱1,000.00</td>
				</tr>
				<tr>
					<td colspan="3"></td>
					<td>Shipping Fee</td>
					<td>₱100.00</td>
				</tr>
				<tr>
					<td colspan="3"></td>
					<td>Disc Code</td>
					<td>PR12345</td>
				</tr>
				<tr>
					<td colspan="3"></td>
					<td>Discount</td>
					<td class="text-danger">- ₱100.00</td>
				</tr>
				<tr>
					<td colspan="3"></td>
					<td>Total</td>
					<td>₱1,000.00</td>
				</tr>
			</tbody>
		</table>
		<div class="row">
			<p>Note:</p>
		</div>
		<div class="row pt-2">
			<p>Mode of Payment:</p>
			<div class="col-3">
				<p>GCash</p>
				<p>
					Reneilda D <br />
					0920 000 0000
				</p>
			</div>
			<div class="col">
				<p>BPI Family Savings</p>
				<p>
					Reneilda de Leon <br />
					0920 000 0000
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['item']
};
</script>

<style scoped>
#print-table {
	padding: 2rem;
	color: #6eccff !important;

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

.img-container img {
	position: absolute;
	top: -2rem;
	right: -10rem;
	bottom: 0 !important;
	width: 100%;
}

.table > :not(:first-child) {
	border-top: 0px solid black;
}
</style>
