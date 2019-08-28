<template>
  <div>
    <v-hover
      v-slot:default="{ hover }"
    >
      <v-card
        class="mx-auto white mb-8 pb-8"
        :elevation="hover ? 12 : 2"
        outlined
        style="min-height: 150px"
        @click="gotoFolder(path)"
      >
        <v-list-item three-line>
          <div
            style="width: 150px;"
            class="hidden-sm-and-down"
          >
            <v-list-item-avatar
              tile
              :min-width="width"
              :height="height"
            >
              <v-img
                :src="require(`@/assets/${logo}`)"
              />
            </v-list-item-avatar>
          </div>
          <v-list-item-content>
            <v-list-item-title
              class="headline mb-1"
              style="font-weight: 700"
            >
              {{ title }}
            </v-list-item-title>

            <div v-html="content" />
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
  export default {
    props: {
      logo: {
        type: String,
        default: 'state-seal-color.png',
      },
      title: {
        type: String,
        default: 'Title here',
      },
      content: {
        type: String,
        default: 'Content here',
      },
      width: {
        type: Number,
        default: 100,
      },
      height: {
        type: Number,
        default: 100,
      },
      path: {
        type: String,
        default: '',
      },
    },
    mounted () {

    },
    methods: {
      gotoFolder (path) {
        location.href = `${path}`
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
