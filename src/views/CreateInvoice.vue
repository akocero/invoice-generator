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
						<div class="row">
							<div class="mb-3 col-6">
								<label for="" class="form-label"
									>Customers</label
								>
								<select
									class="form-select"
									aria-label="Default select example"
								>
									<option selected>
										Open this select menu
									</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
							<div class="mb-3 col-6">
								<label for="" class="form-label"
									>Payable To</label
								>
								<select
									class="form-select"
									aria-label="Default select example"
								>
									<option selected>
										Open this select menu
									</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
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
								<label for="" class="form-label">Items</label>
								<select
									class="form-select"
									aria-label="Default select example"
								>
									<option selected>
										Open this select menu
									</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
							<div class="mb-3 col-6">
								<label
									for="exampleFormControlInput1"
									class="form-label"
									>Quantity</label
								>
								<input
									type="number"
									class="form-control"
									id="exampleFormControlInput1"
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-12">
								<button class="btn btn-success">
									Add Item
								</button>
							</div>
						</div>
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
								<tr>
									<th scope="row">Item 1</th>
									<td>1</td>
									<td>50</td>
									<td>
										<button
											class="btn btn-sm btn-outline-secondary"
										>
											Delete
										</button>
									</td>
								</tr>
								<tr>
									<th scope="row">Item 2</th>
									<td>1</td>
									<td>50</td>
									<td>
										<button
											class="btn btn-sm btn-outline-secondary"
										>
											Delete
										</button>
									</td>
								</tr>
								<tr>
									<td><strong>Total</strong></td>
									<td colspan="3">100</td>
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
export default {};
</script>

<style></style>
