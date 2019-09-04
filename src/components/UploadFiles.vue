<template>
  <div>
    <div v-if="uploadPathAllowed">
      <form
        v-if="isInitial || isSaving "

        enctype="multipart/form-data"
        novalidate
        style="min-height: 200px"
      >
        <!-- Path: {{ path }} -->

        <div class="dropbox">
          <input
            ref="path"
            type="hidden"
            :value="path"
            name="path"
          >
          <input
            ref="uploadToken"
            type="hidden"
            :value="uploadToken"
            name="uploadToken"
          >
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"

            class="input-file"
            @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          >
          <p v-if="isInitial">
            Drag your file(s) here <br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
        </div>
      </form>
    </div>
    <div
      v-else
      style="min-height: 200px"
    >
      <v-card>
        <v-card-text
          class="text-center"
          style="font-weight: 900"
        >
          Select valid upload path.
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '@/event-bus'
  const STATUS_INITIAL = 0
  const STATUS_SAVING = 1
  const STATUS_SUCCESS = 2
  const STATUS_FAILED = 3
  export default {
    data () {
      return {
        path: 'root',
        currentStatus: null,
        uploadFieldName: 'files',
      }
    },
    computed: {
      uploadPathAllowed () {
        if (this.path === 'root' || this.path === 'root/files') {
          return false
        } else {
          return true
        }
      },
      isInitial () {
        return this.currentStatus === STATUS_INITIAL
      },
      isSaving () {
        return this.currentStatus === STATUS_SAVING
      },
      isSuccess () {
        return this.currentStatus === STATUS_SUCCESS
      },
      isFailed () {
        return this.currentStatus === STATUS_FAILED
      },
      uploadToken () {
        return process.env.VUE_APP_ARCHIVE_SECRET
      },
    },
    watch: {
      uploadPathAllowed (newValue, oldValue) {
        EventBus.$emit('uploadPathAllowed', newValue)
      },
    },
    mounted () {
      EventBus.$on('path', (path) => {
        this.path = path
      })
      EventBus.$emit('uploadPathAllowed', false)

      this.reset()
    },
    methods: {
      reset () {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL
        this.uploadedFiles = []
        this.uploadError = null
      },
      filesChange (fieldName, fileList) {
        // handle file changes

        const formData = new FormData()

        if (!fileList.length) return
        // console.log(this.$refs.test.value)
        // append the files to FormData
        Array.from(Array(fileList.length).keys()).map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })
        formData.append('path', this.$refs.path.value)
        formData.append('uploadToken', this.$refs.uploadToken.value)
        // save it
        console.log([...formData])
        // this.save(formData)
      },
    },
  }
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
