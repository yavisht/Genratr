<template>
  <q-page class="row-wrap page">
    <div class="page__wrap">
      <div class="header">
        <div class="text-center">
          <img src="~/assets/logo.svg" alt="" />
          <h1>Genratr</h1>
          <h3>A simple and secure strong password generator</h3>
        </div>
      </div>
      <div class="password-form">
        <div class="row">
          <div class="col-12">
            <q-input
              class="password-field"
              ref="password"
              v-model="password"
              @click="copyPassword()"
              :type="isPwd ? 'password' : 'text'"
              readonly
              :hint="pwHelperText"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                  color="dark"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-4 col-md">
                <q-icon size="md" name="straighten" color="dark" />
                Length
              </div>
              <div class="col-8 col-md">
                <q-field
                  borderless
                  :value="length"
                  :hint="`Longer passwords are harder to crack`"
                >
                  <template v-slot:control>
                    <q-slider
                      v-model="length"
                      :min="9"
                      :max="54"
                      label
                      label-always
                      color="dark"
                    />
                  </template>
                </q-field>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-4">
                <q-icon size="md" name="tune" />
                Strength
              </div>
              <div class="col-8">
                <q-field
                  borderless
                  :hint="`Tweak your password strength`"
                  :value="length"
                >
                  <q-option-group
                    type="toggle"
                    v-model="selected"
                    :options="pwOptions"
                    color="dark"
                    :keep-color="true"
                  />
                </q-field>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer text-center">
        <p>Genratr | 100% open source and free to use password generator</p>
        <p><a href="https://www.github.com/yavisht/">Yavisht Katgara</a></p>
      </div>
    </div>
  </q-page>
</template>
<script>
import _ from "lodash";
const pwHints = {
  selected: "Your generated password will appear here",
  empty: "No password options selected",
};
export default {
  name: "PageIndex",
  mounted() {
    // select all options by default
    this.pwOptions.forEach((o) => {
      this.selected.push(o.value);
    });
    this.generatePassword(this.stringDB);
  },
  watch: {
    length() {
      if (this.selected.length !== 0) {
        this.generatePassword(this.stringDB);
      }
      if (this.password.length > 0) {
        this.pwHelperText = pwHints.selected;
      } else {
        this.pwHelperText = pwHints.empty;
      }
    },
    selected() {
      if (this.selected.length === 0) {
        this.password = "";
        this.pwHelperText = pwHints.empty;
      } else {
        this.generatePassword(this.stringDB);
        this.pwHelperText = pwHints.selected;
      }
    },
  },
  computed: {
    stringDB() {
      const str = this.selected.join("");
      return str.split("");
    },
    passLen() {
      // to check if the password returns the correct length requested
      return this.password.length;
    },
  },
  data() {
    return {
      length: 18,
      password: "",
      selected: [],
      pwOptions: [
        {
          label: "Special characters",
          value: "!@#$%^&*()_+{}:\"'<>?|[];,./`~",
        },
        { label: "Lowercase characters", value: "abcdefghijklmnopqrstuvwxyz" },
        { label: "Uppercase characters", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
        { label: "Numbers", value: "0123456789" },
      ],
      pwHelperText: pwHints.selected,
      isPwd: true,
    };
  },
  methods: {
    generatePassword(str) {
      if (this.length > str.length) {
        str = _.repeat(str.join(""), Math.round(this.length / str.length) + 2);
      }
      const fullLengthPass = _.shuffle(str);
      const shortPass = fullLengthPass.slice(0, this.length);
      this.password = shortPass.join("");
    },
    copyPassword() {
      if (this.password.length === 0) {
        this.pwHelperText = "No password options selected";
        return;
      }
      this.$refs.password.select();
      document.execCommand("copy");
      this.pwHelperText = "Copied to clipboard!";
    },
    onReset() {
      this.password = "";
      this.selected = [];
      this.length = 12;
    },
  },
};
</script>
