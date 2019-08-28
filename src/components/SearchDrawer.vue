<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      width="50%"
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
              @keyup="instantSearch"
            />
          </v-form>
        </v-col>
        <v-col cols="12">
          <div v-if="query.length">
            <div
              v-for="(item, index) in queryResults"
              :key="index"
              class="mb-4"
              @click="closeDrawer"
            >
              <a
                :href="`${item.download}`"
                target="_blank"
              >{{ item.name }}</a>
              <div

                style="font-size: 12px; font-weight: bold"
              >
                {{ item.path }}
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
      EventBus.$on('toggleSearch', () => {
        this.drawer = !this.drawer
      })
      try {
        let searchContent = await fetchData('https://archive.icjia.cloud/files/searchIndex.json')
        this.fuse = new Fuse(searchContent, this.$store.getters.config.search)
        console.log('SearchIndex fetched successfully.')
      } catch (e) {
        console.log('SearchIndex error: ', e)
      }
    },
    methods: {
      closeDrawer() {
        this.drawer=false
      },
      instantSearch () {
        // console.log(this.query)
        this.queryResults = this.fuse.search(this.query).slice(0, 100)
        // console.log(this.fuse.search(this.query))
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
