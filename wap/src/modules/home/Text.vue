<template>
  <div class="form__input">
    <label v-if="label" class="form__label">{{ label }}</label>
    <input
      class="input"
      :type="type"
      :value="value"
      :disabled="disabled"
      @input="updateValue"
      @change="updateValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: String,
    type: {
      type: String,
      default: 'text',
      validate: (val) => {
        // we only cover these types in our input components.
        return ['text', 'url', 'email', 'password', 'search'].indexOf(val) !== -1;
      }
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value);
    }
  }
};
</script>
