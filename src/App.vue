<template>
  <v-app>
    <app-nav />
    <search-drawer />
    <v-content>
      <router-view />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
  import AppNav from '@/components/AppNav'
  import AppFooter from '@/components/AppFooter'
  import SearchDrawer from '@/components/SearchDrawer'
  export default {
    name: 'App',
    components: {
      AppNav,
      SearchDrawer,
      AppFooter,

    },
    data: () => ({
    //
    }),
    async created () {
      if (!this.$store.state.isAppReady) {
        this.$store.dispatch('init')
      }
    },
    mounted () {
      if (process.env.NODE_ENV === 'development') {
      }
      // eslint-disable-next-line vue/script-indent
    // console.log(this.$store.getters.config)
    },
  }
</script>
