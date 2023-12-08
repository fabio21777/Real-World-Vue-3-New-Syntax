<template lang="">
  <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', value)"
    />
  <label v-if="label">{{ label }}</label>
</template>
<script>
export default {

  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    }
  }
}
</script>
<style lang="">

</style>
