<template>
	<div class="items" style="margin-top: 2rem">
		<div class="card border-0">
			<div class="card-body p-4">
				<div
					class="d-flex justify-content-between align-items-baseline"
				>
					<h5 class="card-title mb-4">Items</h5>
					<button class="btn btn-primary">Add New</button>
				</div>
				<table class="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">First</th>
							<th scope="col">Last</th>
							<th scope="col">Handle</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td colspan="2">Larry the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
