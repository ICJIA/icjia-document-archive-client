<template>
  <v-app>
    <app-nav />
    <search-drawer />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  import AppNav from '@/components/AppNav'
  import SearchDrawer from '@/components/SearchDrawer'
  export default {
    name: 'App',
    components: {
      AppNav,
      SearchDrawer,
    },
    data: () => ({
    //
    }),
    async created () {
      if (!this.$store.state.isAppReady) {
        const configPromise = process.BROWSER_BUILD
          ? import('@/config.json')
          : Promise.resolve(require('@/config.json'))
        let config = await configPromise
        this.$store.dispatch('setConfig', config)
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
