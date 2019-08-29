<template>
  <div>
    <v-container v-if="!$store.getters.isLoggedIn">
      <v-flex>
        <v-card
          class="mx-auto mt-12 py-10 px-10"
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
              label="Select agency"
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
        </v-card>
      </v-flex>
    </v-container>
    <v-container v-else>
      <v-flex>
        <v-card
          class="mx-auto mt-3 py-3 text-center"
          style="max-width: 500px;"
        >
          <v-card-text>You're already logged in.</v-card-text>
          <v-btn @click="logout">
            Logout
          </v-btn>
          <div class="mt-3">
            <router-link to="/upload">
              Go to upload
            </router-link>
          </div>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      username: '',
      items: ['adult-redeploy', 'icjia', 'spac'],
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
        this.$store.dispatch('logout')
      },
      reset () {
        this.$refs.form.reset()
      },

    },
  }
</script>
