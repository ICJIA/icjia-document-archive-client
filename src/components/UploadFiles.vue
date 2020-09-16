<template>
  <div>
    <div v-if="isInitial || isSaving">
      <form
        v-if="uploadPathAllowed"
        enctype="multipart/form-data"
        novalidate
        style="min-height: 200px"
      >
        <div class="dropbox">
          <input ref="path" type="hidden" :value="path" name="path" />
          <input
            ref="uploadToken"
            type="hidden"
            :value="uploadToken"
            name="uploadToken"
          />
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            class="input-file"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
          />
          <p v-if="isInitial">
            Drag your file(s) here <br />
            or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...<br />
            <v-progress-circular
              :size="40"
              :width="7"
              color="purple"
              indeterminate
              class="mt-5"
            />
          </p>
        </div>
      </form>
      <div v-if="!uploadPathAllowed" style="min-height: 200px">
        <v-card>
          <v-card-text class="text-center" style="font-weight: 900">
            Select valid upload path.
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div v-if="isSuccess">
      <v-card v-if="successfulUploads.length">
        <v-card-title class="green lighten-4">
          Successfully uploaded:
        </v-card-title>
        <v-card-text class="green lighten-4">
          <ul>
            <li v-for="(upload, index) in successfulUploads" :key="index">
              {{ upload }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
      <v-card v-if="failedUploads.length">
        <v-card-title class="red lighten-4">
          Already exists. Not uploaded:
        </v-card-title>
        <v-card-text class="red lighten-4">
          <ul>
            <li v-for="(upload, index) in failedUploads" :key="index">
              {{ upload }}
            </li>
          </ul>
        </v-card-text>
      </v-card>

      <div class="text-center mt-8">
        <v-btn @click="reset()">
          Upload more
          <v-icon right> autorenew </v-icon>
        </v-btn>
      </div>
    </div>

    <div v-if="isFailed" class="text-center mt-4">
      <div class="text-center">
        <v-alert type="error" class="mt-4 mb-4">
          <pre>{{ uploadError }}</pre>
        </v-alert>
        <h2>Upload failed.</h2>
        <div class="text-center mt-8">
          <v-btn @click="reset()">
            Try again
            <v-icon right> cached </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { upload } from "@/services/upload";

import { EventBus } from "@/event-bus";
const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;
export default {
  data() {
    return {
      path: "root/",
      currentStatus: null,
      uploadFieldName: "files",
      uploadError: null,
    };
  },
  computed: {
    uploadPathAllowed() {
      if (this.path === "root/" || this.path === "root/files/") {
        return false;
      } else {
        return true;
      }
    },
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
    uploadToken() {
      return process.env.VUE_APP_ARCHIVE_SECRET;
    },
  },
  watch: {
    uploadPathAllowed(newValue, oldValue) {
      EventBus.$emit("uploadPathAllowed", newValue);
    },
    currentStatus(newValue, oldValue) {
      EventBus.$emit("currentStatus", newValue);
    },
  },
  mounted() {
    this.reset();
    EventBus.$on("path", (path) => {
      this.path = path;
    });
    EventBus.$emit("uploadPathAllowed", false);
    EventBus.$emit("currentStatus", this.currentStatus);
    EventBus.$emit("rebuildSearchIndex");
  },
  methods: {
    save(formData) {
      // upload data to the server

      this.currentStatus = STATUS_SAVING;
      // this.currentStatus = STATUS_SUCCESS

      upload(formData)
        .then((x) => {
          this.allFiles = x.allFiles;
          this.successfulUploads = x.successfulUploads;
          this.failedUploads = x.failedUploads;
          this.currentStatus = STATUS_SUCCESS;
          EventBus.$emit("currentStatus", this.currentStatus);
          EventBus.$emit("rebuildSearchIndex");
        })
        .catch((err) => {
          this.uploadError = err;
          this.currentStatus = STATUS_FAILED;
          EventBus.$emit("currentStatus", this.currentStatus);
        });
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
      EventBus.$emit("currentStatus", this.currentStatus);
      EventBus.$emit("path", "root/");
    },
    filesChange(fieldName, fileList) {
      // handle file changes

      const formData = new FormData();

      if (!fileList.length) return;
      // console.log(this.$refs.test.value)
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      formData.append("path", this.$refs.path.value);
      formData.append("uploadToken", this.$refs.uploadToken.value);
      // save it
      // console.log([...formData])
      this.save(formData);
    },
  },
};
</script>

<style>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: #ccc;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: #aaa; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
