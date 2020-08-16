<template>
  <div>
    <input v-model="email" type="text" />
    <div>
      {{ isEmailValid }}
    </div>
  </div>
</template>

<script>
import * as validator from 'validator'
export default {
  data: () => ({
    email: 'jiheekim@naver.com'
  }),
  computed: {
    isEmailValid() {
      console.log(validator)
      // console.log(validate.isEmail(this.email))
      return validator.isEmail(this.email)
    }
  }
}
</script>

<style></style>
