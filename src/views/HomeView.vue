<template>
	<div class="home">
		<div class="card p-4">
			<h3>Item List</h3>
			<table class="table table-bordered">
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
</template>

<script>
import { ref } from 'vue';
export default {
	setup() {
		const blogs = ref([
			{ title: 'Why Coffee is Better than Tea', id: 1 },
			{ title: '...Then I Took an Arrow in the Knee', id: 2 },
			{ title: 'Mario vs Luigi, Ultimate Showdown', id: 3 }
		]);
		return {
			blogs
		};
	}
};
</script>
