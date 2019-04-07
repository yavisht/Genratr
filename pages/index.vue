<template>
  <div>
    <b-row class="text-center">
      <b-col>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 6v12h24v-12h-24zm22 10h-20v-8h20v8zm-14.812-4.048l-.217-.619-.658.25v-.708h-.643v.706l-.641-.249-.217.619.661.223-.422.559.537.392.397-.586.422.585.527-.392-.422-.558.676-.222zm4 0l-.217-.619-.658.25v-.708h-.643v.706l-.641-.249-.217.619.661.223-.422.559.536.392.398-.586.422.585.527-.392-.422-.558.676-.222zm4 0l-.217-.619-.658.25v-.708h-.643v.706l-.641-.249-.217.619.661.223-.422.559.536.392.398-.586.422.585.527-.392-.422-.558.676-.222zm4.812 2.048h-3v-1h3v1z"/>
        </svg>
        <h1>Genratr</h1>
        <h3>A simple and secure strong password generator</h3>
      </b-col>
    </b-row>
    <b-form @submit.prevent="generatePassword(stringDB)" @reset="onReset">
      <b-form-group id="password" label="Your generated password" label-for="thePassword">  
        <b-input-group-append>
          <b-form-input
            class="mb=1"
            id="thePassword"
            type="text"
            v-model="form.password"
            placeholder="Click Generate" />
          <b-button type="button" variant="secondary" @click="copyPassword">Copy</b-button>
        </b-input-group-append>
        <small v-if="copied">Copied!</small>
      </b-form-group>
      <b-form-group id="length" label="Desired password length" label-for="theLength">
        <small>{{length}}</small>
        <b-form-input
            id="theLength"
            type="range"
            v-model="length"
            min="6"
            max="48"/>
      </b-form-group>
      <b-form-group label="Choose your password options">
        <b-form-checkbox-group
          id="thePwOptions"
          name="pwOptions"
          v-model="selected"
          :options="pwOptions"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Generate</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import _ from 'lodash'
  export default {
    data() {
      return {
        length : '10',
        copied: false,
        generated: false,
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
    watch: {
      length() {
        //generate password when someone changes the password length.
        if(this.generated == true){
          this.generatePassword(this.stringDB)
        }
      }
    },
    computed:{
      stringDB(){
        let str = this.selected.join('')
        return str.split('')
      },
      passLen(){
        // to check if the password returns the correct length requested
        return this.form.password.length
      }
    },
    methods: {
      generatePassword(str) {
        this.copied = false
        if(this.length > str.length ){
          // Giving it more characters to choose from than then length
          str = _.repeat(str.join(''), (Math.round(this.length / str.length) + 2) )
        }
        let fullLengthPass = _.shuffle(str)
        let shortPass = fullLengthPass.slice(0, this.length)
        this.form.password = shortPass.join('')
        this.generated = true
      },
      copyPassword(){
        let pass = document.getElementById("thePassword")
        pass.select()
        document.execCommand("copy")
        this.copied = true
        //alert('Copied to clipboard')
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.password = ''
        this.selected = []
        this.generated = false
      }
    }
  }
</script>
<style>
  svg{
    margin-top:30px;
    width: 20%;
  }
  h3{
    font-size: 1.55rem;
    margin-bottom:30px;
  }
  button{
    margin-bottom:15px;
  }
</style>
