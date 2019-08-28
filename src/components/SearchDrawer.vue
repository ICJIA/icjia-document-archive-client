<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app

      disable-resize-watcher
      right
      :width="getWidth()"
    >
      <v-container
        fluid
      >
        <v-col cols="12">
          <v-form class="pl-2">
            <v-text-field
              ref="textfield"
              v-model="query"
              label="Search ICJIA Archive by Filename"
              placeholder="Start typing..."
              :clearable="true"
              @keyup="instantSearch"
              @click:clear="reset()"
            />
          </v-form>
        </v-col>
        <v-col cols="12">
          <div v-if="query">
            <div
              v-for="(item, index) in queryResults"
              :key="index"
              class="mb-4"
              @click="closeDrawer"
            >
              <a
                :href="`${item.download}`"
                target="_blank"
                class="dont-break-out"
              >{{ item.name }}</a>
              <div

                style="font-size: 12px; font-weight: bold"
                class="dont-break-out"
              >
                {{ removeFilename(item.path, item.name) }}
              </div>
            </div>
          </div>
        </v-col>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import Fuse from 'fuse.js'
  import { EventBus } from '@/event-bus'
  async function fetchData (endpoint) {
    // eslint-disable-next-line no-unused-vars
    let data
    let response = await fetch(endpoint)
    return (data = await response.json())
  }
  export default {
    data () {
      return {
        drawer: false,
        query: '',
        queryResults: [],
        content: '',
        showPath: false,
      }
    },
    async created () {
      try {
        let searchContent = await fetchData(
          'https://archive.icjia.cloud/files/searchIndex.json'
        )
        this.fuse = new Fuse(searchContent, this.$store.getters.config.search)
        console.log('SearchIndex fetched successfully.')
      } catch (e) {
        console.log('SearchIndex error: ', e)
      }
    },
    mounted () {
      EventBus.$on('toggleSearch', () => {
        this.drawer = !this.drawer
        this.$nextTick(() => {
          this.$refs.textfield.focus()
        })
      })
    },
    methods: {
      closeDrawer () {
        this.drawer = false
      },
      removeFilename (path, name) {
        let newPath = path.replace(name, '')
        return newPath
      },
      getWidth () {
        if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
          return '80%'
        } else {
          return '40%'
        }
      },
      reset () {
        this.queryResults = []
      },
      instantSearch () {
        // console.log(this.query)
        this.queryResults = this.fuse
          .search(this.query)
          .slice(0, this.$store.getters.config.maxSearchResults)
      // console.log(this.fuse.search(this.query))
      },
    },
  }
</script>

<style lang="scss" scoped>
</style>
