<template>
  <div id="uploadPage">
    <v-container

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

      items: [],
    }),

    watch: {},

    async created () {
      try {
        let directoryTree = await fetchData(
          'https://archive.icjia.cloud/files/directoryTree.json'
        )
        console.log('directoryTree fetched successfully.')
        this.items.push(directoryTree)
      } catch (e) {
        console.log('directoryTree error: ', e)
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
