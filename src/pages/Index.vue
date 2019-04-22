<template>
  <q-page class="row-wrap page">
    <div class="page__wrap">
      <div class="text-center">
        <img src="~/assets/logo.svg" alt="" />
        <h1>Genratr</h1>
        <h3>A simple and secure strong password generator</h3>
      </div>
      <q-field :helper="pwHelperText">
        <q-input @click="copyPassword()" ref="password" v-model="password" readonly/>
      </q-field>
      <q-field icon="security" label="Length" helper="Choose a password length">
        <q-slider
          v-model="length"
          :min="9"
          :max="54"
          label-always
        />
      </q-field>
      <q-field icon="lock" label="Password Options" helper="Customoise your password">
        <q-option-group type="toggle" v-model="selected" :options="pwOptions"/>
      </q-field>
      <!-- <q-btn
        color="primary"
        @click="copyPassword()"
        label="Copy"
      /> -->
      <q-btn
        color="red"
        @click="onReset()"
        label="Reset"
      />
    </div>
  </q-page>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'PageIndex',
  watch: {
    length () {
      this.generatePassword(this.stringDB)
    },
    selected () {
      this.generatePassword(this.stringDB)
    }
  },
  computed: {
    stringDB () {
      let str = this.selected.join('')
      return str.split('')
    },
    passLen () {
      // to check if the password returns the correct length requested
      return this.password.length
    }
  },
  data () {
    return {
      length: 12,
      password: '',
      selected: [],
      pwOptions: [
        { label: 'Special characters', value: '!@#$%^&*()_+{}:"\'<>?|[];,./`~' },
        { label: 'Lowercase characters', value: 'abcdefghijklmnopqrstuvwxyz' },
        { label: 'Uppercase characters', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { label: 'Numbers', value: '0123456789' }
      ],
      pwHelperText: 'Your generated password will appear here'
    }
  },
  methods: {
    generatePassword (str) {
      if (this.length > str.length) {
        str = _.repeat(str.join(''), (Math.round(this.length / str.length) + 2))
      }
      let fullLengthPass = _.shuffle(str)
      let shortPass = fullLengthPass.slice(0, this.length)
      this.password = shortPass.join('')
      this.pwHelperText = 'Your generated password will appear here'
    },
    copyPassword () {
      this.$refs.password.select()
      document.execCommand('copy')
      this.pwHelperText = 'Copied to clipbord!'
    },
    onReset () {
      this.password = ''
      this.selected = []
      this.length = 12
    }
  }
}
</script>
<style>
  .page{
    padding:15px;
    word-wrap: break-word;
  }
  .page__wrap{
    max-width: 540px;
    position:relative;
    margin:0 auto;
  }
  img{
    width:18%;
  }
  .q-field{
    margin-bottom:30px;
  }
  .align-center{
    text-align: center;
  }
  h1{
    font-size: 3em;
    margin:5px 0;
  }
  h3{
    line-height:1.2;
    margin:5px 0 45px 0;
    font-size: 1.5em;
  }
  .header{
    margin-bottom:30px;
  }
  button:first-of-type{
    margin-right:15px;
  }
</style>
