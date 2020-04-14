<template>
  <div v-if="currentStatus === 0 || currentStatus === 1">
    <v-card id="treeviewBox">
      <v-treeview
        v-model="tree"
        :dense="true"
        :items="items"
        activatable
        item-key="path"
        open-on-click
        hoverable
      >
        <template v-slot:label="{ item }">
          <span v-if="item.type === 'file'" class="hover">
            <span style="color: #aaa">{{ item.name }}</span>
          </span>
          <span v-else class="hover" @click.prevent="getPath(item)">
            {{ item.name }}
          </span>
        </template>
        <!-- <template v-slot:prepend="{ item, open }">
          <v-icon
            v-if="item.type==='directory'"
            :id="item.path"
            class="hover"

            @click.prevent="getPath(item)"
          >
            mdi-folder
          </v-icon>
        </template> -->
      </v-treeview>
    </v-card>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      open: [],
      tree: [],
      currentStatus: null
    };
  },
  mounted() {
    EventBus.$on("currentStatus", currentStatus => {
      this.currentStatus = currentStatus;
    });
  },
  methods: {
    getPath(item) {
      let path = item.path;
      if (path.substr(-1) !== "/") {
        path += "/";
      }
      EventBus.$emit("path", path);
    }
  }
};
</script>

<style scoped>
#treeviewBox {
  background: #fafafa;
  width: 100%;
  height: 350px;

  overflow: scroll;
}
</style>
