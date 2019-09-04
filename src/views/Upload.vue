<template>
  <div id="uploadPage">
    <v-container
      v-if="!loading"
      class="mb-12"
    >
      <v-row>
        <v-col cols="12">
          <upload-path-display />
          <upload-directory-tree :items="items" />
          <upload-files />
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-if="loading"
      class="mb-12"
    >
      <v-row>
        <v-col cols="12">
          <div class="text-center mt-12">
            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

  import UploadPathDisplay from '@/components/UploadPathDisplay'
  import UploadDirectoryTree from '@/components/UploadDirectoryTree'
  import UploadFiles from '@/components/UploadFiles'
  async function fetchData (endpoint) {
    // eslint-disable-next-line no-unused-vars
    let data
    let response = await fetch(endpoint)
    return (data = await response.json())
  }
  export default {
    components: {
      UploadPathDisplay,
      UploadDirectoryTree,
      UploadFiles,

    },
    data: () => ({
      loading: true,
      items: [],
    }),

    watch: {},

    async created () {
      try {
        this.loading = true
        let directoryTree = await fetchData(
          'https://archive.icjia.cloud/files/directoryTree.json'
        )
        console.log('directoryTree fetched successfully.')
        this.items.push(directoryTree)
        this.loading = false
      } catch (e) {
        console.log('directoryTree error: ', e)
        this.loading = false
      }
    },

  }
</script>

<style>
.hover {
  cursor: pointer
}

#uploadPage {

}

</style>
