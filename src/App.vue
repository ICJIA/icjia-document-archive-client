<template>
  <v-app>
    <app-nav />
    <search-drawer />
    <v-content>
      <corona ref="alert" />
      <router-view />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppNav from "@/components/AppNav";
import AppFooter from "@/components/AppFooter";
import SearchDrawer from "@/components/SearchDrawer";
import Corona from "@/components/Corona";
export default {
  name: "App",
  components: {
    AppNav,
    SearchDrawer,
    AppFooter,
    Corona,
  },
  data: () => ({
    //
  }),
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      if (this.$refs.alert) this.$refs.alert.reset();
    },
  },
  async created() {
    if (!this.$store.state.isAppReady) {
      this.$store.dispatch("init");
    }
  },
  mounted() {
    if (process.env.NODE_ENV === "development") {
    }
    // eslint-disable-next-line vue/script-indent
    // console.log(this.$store.getters.config)
  },
};
</script>
