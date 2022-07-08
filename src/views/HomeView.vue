<template>
	<div class="home">
		<div class="card p-4 border-0" style="margin-top: 2rem">
			<div class="d-flex justify-content-between align-items-center">
				<h5 class="card-title mb-4">Dashboard</h5>
			</div>
			Welcome!
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
