<template>
  <div>
    <b-form @submit.prevent="generatePassword(stringDB)" @reset="onReset">
      <b-form-group id="password" label="Your Generated Password" label-for="thePassword">
        <b-form-input
          id="thePassword"
          type="text"
          v-model="form.password"
          placeholder="Click Generate" />
      </b-form-group>
      <b-form-group id="length" label="Desired Password Length" label-for="theLength">
        <small>{{length}}</small>
        <b-form-input
            id="theLength"
            type="range"
            v-model="length"
            min="6"
            max="48"/>
      </b-form-group>
      <b-form-group label="Using options array:">
        <b-form-checkbox-group
          id="checkboxes1"
          name="flavour1"
          v-model="selected"
          :options="pwOptions"
        />
    </b-form-group>
      <b-button type="submit" variant="primary">Generate</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="button" variant="secondary" @click="copyPassword">Copy to Clipboard</b-button>
    </b-form>
  </div>
</template>

<script>
import _ from 'lodash'
  export default {
    data() {
      return {
        length : '10',
        form: {
          password:''
        },
        selected: [], // Must be an array reference!
        pwOptions: [
          { text: 'Special characters', value: '!@#$%^&*()_+{}:"<>?\|[];\',./`~' },
          { text: 'Lowercase characters', value: 'abcdefghijklmnopqrstuvwxyz' },
          { text: 'Uppercase characters', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
          { text: 'Numbers', value: '0123456789' }
        ]
      }
    },
    computed:{
      stringDB(){
        let str = this.selected.join('')
        return str.split('')
      },
      passLen(){
        //to check if the password returns the correct length requested
        return this.form.password.length
      }
    },
    methods: {
      generatePassword(str) {
        if(this.length > str.length ){
          // Giving it more characters to choose from than then length
          str = _.repeat(str.join(''), (Math.round(this.length / str.length) + 2) )
        }
        let fullLengthPass = _.shuffle(str)
        let shortPass = fullLengthPass.slice(0, this.length)
        this.form.password = shortPass.join('')
      },
      copyPassword(){
        var pass = document.getElementById("thePassword");
        pass.select();
        document.execCommand("copy");
        alert('Copied to clipboard')
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.password = ''
        this.selected = []
      }
    }
  }
</script>