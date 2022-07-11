<template>
	<label
		>{{ label }}
		<span v-if="required" class="text-danger text-bold">*</span>
	</label>
	<select
		:id="id"
		class="form-select"
		:class="[error && errorField && 'is-invalid']"
		:value="modelValue"
		@change="$emit('update:modelValue', $event.target.value)"
		:disabled="disabled"
	>
		<option value="" v-if="emptyOption">Choose</option>

		<option
			:value="option.value || option[optionValue]"
			v-for="option in options"
			:key="option.value || option[optionValue]"
		>
			{{ option.label || option[optionLabel] }}
		</option>
	</select>
	<small v-if="error && errorField" class="form-text text-danger">
		{{ errorField }}
	</small>
</template>

<script>
export default {
	name: 'BaseSelectField',
	props: {
		modelValue: String | Number,
		emptyOption: {
			type: Boolean,
			default: true
		},
		optionValue: {
			type: String,
			default: ''
		},
		optionLabel: {
			type: String,
			default: ''
		},
		id: String,
		label: String,
		error: Object,
		required: Boolean,
		errorField: String,
		options: {
			type: Array,
			required: true
		},
		disabled: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style></style>
