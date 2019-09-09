<template>
  <div>
    <v-container v-if="!$store.getters.isLoggedIn">
      <v-col>
        <v-card
          class="mx-auto mt-12 mb-12 py-10 px-10"
          style="max-width: 500px;"
        >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="username"

              :rules="usernameRules"
              label="Username"
              required
            />

            <v-text-field
              v-model="password"
              type="password"
              :rules="passwordRules"
              label="Password"
              required
            />

            <v-select
              v-model="agency"
              :items="items"
              :rules="agencyRules"
              filled
              label="Select authentication agency"
              class="mt-3"
            />

            <div class="text-center">
              <v-btn
                :disabled="!valid"

                color="success"
                class="mr-4 mt-5"
                @click="validate"
              >
                Login
              </v-btn>

              <v-btn
                color="grey lighten-3"

                class="mr-4 mt-5"
                @click="reset"
              >
                Clear
              </v-btn>
            </div>
          </v-form>
          <div class="text-center">
            <v-alert
              :value="alert"
              outlined
              type="error"
              class="mt-5"
              style="max-width: 500px; color: red !important;"
            >
              {{ msg }}
            </v-alert>
          </div>
        </v-card>
      </v-col>
    </v-container>
    <v-container v-else>
      <v-col>
        <v-card
          class="mx-auto mt-12 py-3 text-center"
          style="max-width: 500px;"
        >
          <v-card-text>You're already logged in.</v-card-text>
          <v-btn
            dark
            color="blue"
            @click="logout"
          >
            Logout
          </v-btn>
          <div class="mt-12">
            <router-link to="/upload">
              Go to file upload&nbsp;&raquo;
            </router-link>
          </div>
        </v-card>
      </v-col>
    </v-container>
  </div>
</template>

<script>
  import { EventBus } from '@/event-bus'

  export default {
    data: () => ({
      alert: false,
      valid: true,
      msg: '',
      username: '',
      items: ['adult-redeploy', 'spac'],
      usernameRules: [
        v => !!v || 'Username is required',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      agency: '',
      agencyRules: [
        v => !!v || 'Agency is required',
      ],

      select: null,

    }),
    mounted () {
      EventBus.$on('error', msg => {
        this.msg = msg
        this.alert = true
        console.log('error: ', msg)
      })
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          let identifier = this.username
          let password = this.password
          let agency = this.agency
          let payload = {}
          payload.identifier = identifier
          payload.password = password
          payload.agency = agency
          this.$store
            .dispatch('login', payload).then(() => this.$router.push('/upload'))
            .catch(err => console.log(err))
        }
      },
      logout () {
        this.$store.dispatch('logout').then(res => {
          console.log(res)
        })
      },
      reset () {
        this.$refs.form.reset()
        this.alert = false
        this.msg = ''
      },

    },
  }
</script>
