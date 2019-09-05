<template>
  <v-app-bar
    color="white"
    fixed
    height="90"
    class="noprint"
    app
  >
    <div style="width: 15px" />

    <img
      src="@/assets/icjia-logo.png"
      alt="Illinois Criminal Justice Information Authority"
      :width="logoWidth()"
      style="margin-left: -5px; margin-right: 8px;"
      class="hover"
      @click="
        $router.push('/').catch(err => {
          $vuetify.goTo(0);
        })
      "
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <v-toolbar-title
      class="heavy hover"
      @click="
        $router.push('/').catch(err => {
          $vuetify.goTo(0);
        })
      "
    >
      <span
        style="font-weight: 900; cursor: pointer"
        class="agency"
      ><span :class="{'hidden-sm-and-down': $vuetify.breakpoint.xs || $vuetify.breakpoint.sm}">DOCUMENT</span> ARCHIVE</span>
    </v-toolbar-title>

    <div class="flex-grow-1" />

    <v-toolbar-items>
      <v-btn
        depressed
        color="white"
        to="/upload"
        class="hidden-sm-and-down"
      >
        <span
          :class="{'hidden-sm-and-down': $vuetify.breakpoint.xs || $vuetify.breakpoint.sm}"
        >Upload</span>
        <v-icon right>
          cloud_upload
        </v-icon>
      </v-btn>
      <v-btn
        depressed
        color="white"
        @click="toggleSearch"
      >
        <span>Search</span>
        <v-icon right>
          search
        </v-icon>
      </v-btn>

      <v-btn
        v-if="$store.getters.isLoggedIn"
        depressed
        color="white"
        @click="logout"
      >
        <span
          :class="{'hidden-sm-and-down': $vuetify.breakpoint.xs || $vuetify.breakpoint.sm}"
          style="color: blue"
        >LOGOUT</span>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
/* eslint-disable vue/no-use-v-if-with-v-for */
  import { EventBus } from '@/event-bus.js'

  export default {

    methods: {
      toggleSearch () {
        EventBus.$emit('toggleSearch')
      },
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      },
      logoWidth () {
        // console.log(this.$vuetify.breakpoint);
        if (this.$vuetify.breakpoint.xs) {
          return 50
        } else {
          return 90
        }
      },
    },
  }
</script>
