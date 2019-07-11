<template>
  <div>
    <input v-validate="'required|email'" name="name" type="text">
    <span>{{ errors.first('name') }}</span>
    <br /><br />
    <!--<input v-validate="{required : true, regex :/ [ 0-9 ] + / }" name="email" type="text">-->
    <!--<span>{{ errors.first('email') }}</span>-->

    <text-input
      name="email"
      label="Email Address"
      v-validate="'required|email'"
      v-model="email"
      type="email"
    ></text-input>
    <span>{{ errors.first('email') }}</span>
    <p class="btn" @click="validateBeforeSubmit">确认提交</p>
  </div>
</template>

<script>
import TextInput from './Text';

export default {
  components: {
    TextInput
  },
  data() {
    return {
      email: ''
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert('Form Submitted!');
          return;
        }

        alert('Correct them errors!');
      });
    }
  }
};
</script>

<style scoped>
input{
  border: 1px solid;
}
</style>
