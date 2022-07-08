<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-white">
		<div class="container-fluid">
			<a class="navbar-brand text-uppercase" href="#">papierenei</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<!-- <a class="nav-link" href="#">Items</a> -->
						<router-link to="/items" class="nav-link"
							>Items</router-link
						>
					</li>
					<li class="nav-item">
						<router-link to="/customers" class="nav-link"
							>Customers</router-link
						>
					</li>
					<li class="nav-item">
						<router-link to="/create-invoice" class="nav-link"
							>Create Invoice</router-link
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link disabled"
							href="#"
							tabindex="-1"
							aria-disabled="true"
							>Disabled</a
						>
					</li>
				</ul>
				<ul class="navbar-nav">
					<li class="nav-item">
						<router-link to="/signup" class="nav-link"
							>Sign Up</router-link
						>
					</li>
					<li class="nav-item">
						<router-link to="/login" class="nav-link"
							>Log In</router-link
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {};
</script>

<style></style>
