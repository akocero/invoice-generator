<template>
	<Navbar />
	<div class="container">
		<router-view></router-view>
	</div>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
	name: 'Main',
	components: {
		Navbar
	},
	data() {
		return {
			activeRoute: null,
			activeNav: null
		};
	}
};
</script>
