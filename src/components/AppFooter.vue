<template>
  <v-footer
    dark
    padless
    class="noprint"
  >
    <v-card
      flat
      tile
      class="white--text text-center"
      color="secondary"
      style="width: 100%"
    >
      <v-card-text>
        <v-btn
          :href="`${archiveURL}/files/adult-redeploy`"
          depressed
          class="heavy "
          dark
          color="secondary"
          aria-label="ARI archive"
        >
          <span style="font-size: 12px">ARI archive</span>
        </v-btn>

        <v-btn
          :href="`${archiveURL}/files/icjia`"
          depressed
          class="heavy "
          dark
          color="secondary"
          aria-label="ICJIA archive"
        >
          <span style="font-size: 12px">ICJIA archive</span>
        </v-btn>
        <v-btn
          :href="`${archiveURL}/files/ifvcc`"
          depressed
          class="heavy "
          dark
          color="secondary"
          aria-label="IFVCC archive"
        >
          <span style="font-size: 12px">IFVCC archive</span>
        </v-btn>
        <v-btn
          :href="`${archiveURL}/files/spac`"
          depressed
          class="heavy "
          dark
          color="secondary"
          aria-label="SPAC archive"
        >
          <span style="font-size: 12px">SPAC archive</span>
        </v-btn>
      </v-card-text>
    </v-card>
    <v-card
      flat
      tile
      class="white--text text-center"
      color="primary"
      style="width: 100%"
    >
      <v-divider />

      <v-card-text class="white--text">
        <img
          src="@/assets/icjia-logo-white.png"
          alt="Illinois Criminal Justice Information Authority"
          width="85"
          class="mt-4 mb-4"
        >
        <br>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="white--text"
          icon
          :aria-label="icon"
        >
          <v-icon size="18px">
            {{ icon }}
          </v-icon>
        </v-btn>
        <br>
        <div style="font-size: 12px">
          {{ new Date().getFullYear() }}
          <strong><a
            href="http://www.icjia.state.il.us"
            class="footer-link"
          >Illinois Criminal Justice Information Authority</a></strong>&nbsp;|&nbsp;<strong><a
            href="https://github.com/ICJIA/icjia-document-archive-client"
            target="_blank"
            class="footer-link"
            rel="noreferrer"
          >Github</a>
          </strong>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    props: {
      sections: {
        type: Array,
        default: () => [],
      },
    },
    data: () => ({
      icons: ['fab fa-facebook', 'fab fa-twitter'],
      archiveURL: '',
    }),

    mounted () {
      this.archiveURL = this.$store.getters.config.archiveURL
    },
    methods: {

    },
  }
</script>

<style>
.footer-link {
  color: #fff !important;
  text-decoration: none;
}

.footer-link:hover {
  color: #aaa !important;
}

.heavy {
    font-weight: 900 !important;
}
</style>
