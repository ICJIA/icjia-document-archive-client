<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      disable-resize-watcher
      right
      :width="getWidth()"
    >
      <v-container fluid>
        <v-col cols="12">
          <v-form class="pl-2">
            <div class="text-right">
              <v-btn
                small
                color="blue darken-4"
                class="mb-6"
                dark
                @click="closeDrawer()"
              >
                CLOSE<v-icon right>
                  close
                </v-icon>
              </v-btn>
            </div>
            <v-card class="grey lighten-4">
              <v-card-text style="color: #111">
                <div class="flex-center">
                  Filter results by agency:
                  <br />

                  <span style="font-weight: 900; color: #0C4473">{{
                    getName()
                  }}</span>

                  <v-radio-group v-model="agency" row class="mb-5 ">
                    <v-radio label="All" value="all" />
                    <v-radio label="ARI" value="adult-redeploy" />
                    <v-radio label="ICJIA" value="icjia" />
                    <v-radio label="IFVCC" value="ifvcc" />
                    <v-radio label="SPAC" value="spac" />
                  </v-radio-group>
                </div>
              </v-card-text>
            </v-card>

            <v-text-field
              ref="textfield"
              v-model="query"
              class="mt-10"
              label="Search document archive by filename"
              placeholder="Start typing..."
              :clearable="true"
              @keyup="instantSearch"
              @click:clear="reset()"
            />
          </v-form>
        </v-col>
        <v-col cols="12">
          <div v-if="!queryResults.length && hasSearched" class="text-center">
            No results
          </div>
          <div v-if="query">
            <div
              v-for="(item, index) in queryResults"
              :key="index"
              class="mb-4"
            >
              <a
                :href="`${item.url}`"
                target="_blank"
                class="dont-break-out name"
                >{{ item.name }}</a
              >
              <span style="font-size: 12px; color: #666;"
                >&nbsp;({{ formatBytes(item.stats.size) }})</span
              >
              <div
                style="font-size: 12px; font-weight: bold"
                class="dont-break-out "
              >
                <a :href="`${item.parent}`" class="path" target="_blank">
                  {{ removeFilename(item.path, item.name) }}
                </a>
              </div>
            </div>
          </div>
        </v-col>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import { EventBus } from "@/event-bus";
async function fetchData(endpoint) {
  // eslint-disable-next-line no-unused-vars
  let data;
  let response = await fetch(endpoint);
  return (data = await response.json());
}
export default {
  data() {
    return {
      drawer: false,
      query: "",
      hasSearched: false,
      agency: "all",
      queryResults: [],
      content: "",
      showPath: false,
      masterSearchContent: null,
      filteredSearchContent: null,
      agencyMap: [
        {
          name: "Illinois Criminal Justice Information Authority",
          agency: "icjia"
        },
        { name: "Adult Redeploy Illinois", agency: "adult-redeploy" },
        {
          name: "Illinois Family Violence Coordinating Councils",
          agency: "ifvcc"
        },
        { name: "Illinois Sentencing Policy Advisory Council", agency: "spac" }
      ]
    };
  },
  watch: {
    agency(newValue, oldValue) {
      // this.queryResults = []
      this.filter(newValue);
    }
  },
  async created() {
    await this.getSearchIndex();
  },
  mounted() {
    EventBus.$on("toggleSearch", () => {
      this.drawer = !this.drawer;
    });
    EventBus.$on("rebuildSearchIndex", async () => {
      await this.getSearchIndex();
      // console.log('search index rebuilt')
    });
  },
  methods: {
    closeDrawer() {
      this.drawer = false;
    },
    async getSearchIndex() {
      try {
        let searchContent = await fetchData(
          "https://archive.icjia-api.cloud/searchIndex.json"
        );
        this.masterSearchContent = searchContent;
        this.fuse = new Fuse(
          this.masterSearchContent,
          this.$store.getters.config.search
        );
        // console.log('SearchIndex fetched successfully.')
      } catch (e) {
        // console.log('SearchIndex error: ', e)
      }
    },
    getName() {
      if (this.agency === "all") {
        return "All Agencies";
      }

      let agency = this.agencyMap.filter(item => {
        if (item.agency === this.agency) {
          return item;
        }
      });
      return agency[0].name;
    },
    removeFilename(path, name) {
      let newPath = path.replace(name, "");
      return newPath;
    },
    getWidth() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "80%";
      } else {
        return "40%";
      }
    },
    formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    reset() {
      this.queryResults = [];
      this.hasSearched = false;
    },
    filter(agency) {
      if (agency === "all") {
        this.fuse = new Fuse(
          this.masterSearchContent,
          this.$store.getters.config.search
        );
        this.instantSearch();
      } else {
        let filteredSearchContent = this.masterSearchContent.filter(item => {
          return item.agency === agency;
        });
        this.fuse = new Fuse(
          filteredSearchContent,
          this.$store.getters.config.search
        );
        this.instantSearch();
      }
    },
    instantSearch() {
      // console.log(this.query)

      this.queryResults = this.fuse
        .search(this.query)
        .slice(0, this.$store.getters.config.maxSearchResults);
      this.hasSearched = true;
      // console.log(this.fuse.search(this.query))
    }
  }
};
</script>

<style>
.name {
  color: #3949ab !important;
}
.name:hover {
  color: #888 !important;
}
.path {
  color: #333 !important;
}
.path:hover {
  color: #888 !important;
}
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
