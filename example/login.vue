<template>
  <div>
    <h1>LOGIN</h1>

    {{ $store.state }}

    <input type="text" :class="{error:errors.email}" v-model="values.email"/><br>
    <div class="error-msg">{{ errors.email }}</div>

    <input type="text" :class="{error:errors.password}" v-model="values.password"/>
    <div class="error-msg">{{ errors.password }}</div>

    <button @click="login">login</button>
    <button @click="reset">reset</button>

  </div>
</template>

<script>
import FormValidation from 'form-validation'

export default {
  name: 'login',
  components: {},
  data () {
    return {
      values: {
        email: '',
        password: '',
      },
      rules: {
        email: [{
          required: true,
          message: 'Required!'
        }],
        password: [{
          required: true,
          message: 'Required!'
        }],
      },
      errors: {}
    }
  },
  created () {
    this.validation = new FormValidation(this.values, this.rules, this.errors)
  },
  methods: {
    async login () {
      try {
        if (!this.validation.check(this.values, this.rules, this.errors, true)) {
          throw new Error('Invalid validation!')
        }
        await this.$store.dispatch('auth/login', this.values)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    reset () {
      this.validation.reset(this.values, this.rules, this.errors)
    }
  },
  watch: {
    values: {
      deep: true,
      handler: function () {
        this.validation.check(this.values, this.rules, this.errors)
      }
    }
  }
}
</script>

<style scoped>
.error {
  border: 1px solid red;
}

.error-msg {
  color: red;
  width: 100%;
  overflow: hidden;
  height: 24px;
  transition: width .5s ease;
}

.error-msg:empty {
  width: 0%;
}
</style>
