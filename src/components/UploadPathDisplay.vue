<template>
  <div
    style="background: #eee;"
    class="elevation-1"
  >
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <span v-if="uploadPathAllowed">
            <v-icon

              style="color: green;"
            >cloud_upload</v-icon>
          </span>
          <span v-else>
            <v-icon

              style="color: red"
            >cloud_off</v-icon>
          </span>
          &nbsp;&nbsp;

          Upload directory:&nbsp;&nbsp;<span
            style="background: #ddd; font-weight: bold"
            class="py-1 px-1"
          >{{ path }}</span>
        </v-col>
        <v-col cols="6">
          <div

            class="text-right"
          >
            <v-btn @click="getArchiveURL()">
              Browse at current path
              <v-icon right>
                open_in_new
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { EventBus } from '@/event-bus'
  export default {
    props: {},
    data () {
      return {
        path: 'root/',
        uploadPathAllowed: false,
        currentStatus: null,
      }
    },
    mounted () {
      EventBus.$on('path', path => {
        this.path = path
      })
      EventBus.$on('uploadPathAllowed', bool => {
        this.uploadPathAllowed = bool
      })
      EventBus.$on('currentStatus', currentStatus => {
        this.currentStatus = currentStatus
      })
    },
    methods: {
      getArchiveURL () {
        let path = this.path.replace('root/', '')
        let url = `https://archive.icjia.cloud/${path}`
        window.open(url, '_blank')
      },
    },
  }
</script>

<style>
.hover {
  cursor: pointer;
}

#path {
  background: #eee;
  font-weight: bold;
}
#pathBox {
  font-size: 16px;
  background: #ddd;
}
</style>
