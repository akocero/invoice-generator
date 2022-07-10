<template>
	<label
		>{{ label }}
		<span v-if="required" class="text-danger text-bold">*</span>
	</label>
	<input
		:type="type"
		class="form-control"
		:class="[error && errorField && 'is-invalid']"
		:id="id"
		:placeholder="placeholder"
		:value="modelValue"
		:step="step"
		@input="$emit('update:modelValue', $event.target.value)"
		:disabled="disabled"
	/>
	<!-- <small v-if="error && errorField" class="form-text text-danger">
		{{ errorField[0] }}
	</small> -->
	<small v-if="error && errorField" class="form-text text-danger">
		{{ errorField }}
	</small>
</template>

<script>
export default {
	name: 'BaseInputField',
	props: {
		modelValue: [String, Number],
		id: String,
		label: String,
		error: Object,
		placeholder: String,
		required: Boolean,
		errorField: String,
		disabled: {
			type: Boolean,
			default: false
		},
		step: {
			type: Number,
			default: null
		},
		type: {
			type: String,
			default: 'text',
			validator: function (value) {
				// The value must match one of these strings
				return (
					[
						'text',
						'date',
						'number',
						'email',
						'password',
						'time'
					].indexOf(value) !== -1
				);
			}
		}
	}
};
</script>
