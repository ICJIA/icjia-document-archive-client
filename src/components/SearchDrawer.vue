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
            >
              <a
                :href="`${item.download}`"
                target="_blank"
              >{{ item.name }}</a>
              <div
                v-if="showPath"
                style="font-size: 12px"
              >
                /{{ item.path }}
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
        this.drawer = true
      })

      this.fuse = new Fuse(this.$store.getters.searchContent, this.$store.getters.config.search)
    },
    methods: {
      instantSearch () {
        // console.log(this.query)
        this.queryResults = this.fuse.search(this.query)
        // console.log(this.fuse.search(this.query))
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
