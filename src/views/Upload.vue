<template>
  <div>
    <v-container class="mt-12 mb-12">
      <v-row>
        <v-col cols="12">
          <form
            v-if="isInitial || isSaving"
            enctype="multipart/form-data"
            novalidate
          >
            <h1>Archive Upload Test</h1>

            <div class="dropbox">
              <input
                ref="test"
                type="hidden"
                value="/uploads/test/"
                name="test"
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

          <div v-if="isSuccess">
            <h2>Uploaded {{ successfulUploads.length }} file(s) successfully.</h2>
            <h2>{{ failedUploads.length }} files previously existed and weren't uploaded.</h2>
            <p>
              <a
                href="javascript:void(0)"
                @click="reset()"
              >Upload again</a>
            </p>
          </div>

          <div v-if="isFailed">
            <h2>Uploaded failed.</h2>
            <p>
              <a
                href="javascript:void(0)"
                @click="reset()"
              >Try again</a>
            </p>
            <pre>{{ uploadError }}</pre>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
  import { upload } from '@/services/upload'

  const STATUS_INITIAL = 0
  const STATUS_SAVING = 1
  const STATUS_SUCCESS = 2
  const STATUS_FAILED = 3

  export default {
    name: 'App',
    data () {
      return {
        allFiles: [],
        successfulUploads: [],
        failedUploads: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'files',
      }
    },
    computed: {
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

    mounted () {
      this.reset()
    },
    methods: {
      reset () {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL
        this.uploadedFiles = []
        this.uploadError = null
      },
      save (formData) {
        // upload data to the server

        this.currentStatus = STATUS_SAVING
        // this.currentStatus = STATUS_SUCCESS

        upload(formData)
          .then(x => {
            this.allFiles = x.allFiles
            this.successfulUploads = x.successfulUploads
            this.failedUploads = x.failedUploads
            this.currentStatus = STATUS_SUCCESS
          })
          .catch(err => {
            console.log(err)
            this.uploadError = err.response
            this.currentStatus = STATUS_FAILED
          })
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
        formData.append('test', this.$refs.test.value)
        formData.append('uploadToken', this.$refs.uploadToken.value)
        // save it

        this.save(formData)
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
