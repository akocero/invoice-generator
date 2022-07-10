<template>
	<label
		>{{ label }}
		<span v-if="required" class="text-danger text-bold">*</span>
	</label>
	<textarea
		:id="id"
		:class="[error && errorField && 'is-invalid']"
		class="form-control"
		:placeholder="placeholder"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	></textarea>
	<small v-if="error && errorField" class="form-text text-danger">
		{{ errorField }}
	</small>
</template>

<script>
export default {
	name: 'BaseTextAreaField',
	props: {
		modelValue: String,
		id: String,
		label: String,
		error: Object,
		placeholder: String,
		required: Boolean,
		errorField: Object
	}
};
</script>
