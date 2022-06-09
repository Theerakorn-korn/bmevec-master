<template>
  <div>
    <v-container>
      <v-card id="body_card">
        <v-card-text class="font-weight-medium">
          <h3><v-icon>mdi-file-document</v-icon> เอกสารประกอบการปฏิบัติงาน</h3>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                single-line
                hide-details
                rounded
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="text-right">
              <v-btn
                rounded
                large
                color="primary"
                @click.native="documentsAdd()"
              >
                <v-icon class="pa-2">mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <hr color="#d68822" />
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="documentss"
          :search="search"
        >
          <template v-slot:[`item.documentsLinkfile`]="{ item }">
            <div class="text-center">
              <v-btn
                text
                small
                fab
                dark
                color="info"
                :href="
                  'http://localhost:8080/bmevec_files/' + item.documentsLinkfile
                "
                target="_blank"
              >
                <v-icon dark> mdi-link </v-icon>
              </v-btn>
            </div>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div class="text-center">
              <v-btn
                small
                fab
                dark
                color="warning"
                @click.stop="documentsEdit(item.documentsID)"
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:[`item.action_s`]="{ item }">
            <v-btn
              class="text-center"
              small
              fab
              dark
              color="red"
              @click.stop="documentsDelete(item.documentsID)"
            >
              <v-icon dark> mdi-delete </v-icon>
            </v-btn>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
            >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert
          >
        </v-data-table>
      </v-card>

      <!--adddocumentsdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="adddocumentsdialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="green" class="pa-2" large
                  >mdi-file-document-plus</v-icon
                >
                <v-toolbar-title class="green--text pl-0">
                  เพิ่มข้อมูลเอกสารประกอบการปฏิบัติงาน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="adddocumentsdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="adddocumentsform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-text-field
                        label="หัวข้อเอกสาร"
                        v-model="adddocuments.documentsTopic"
                        prepend-icon="mdi-file-document"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายการอธิบายเอกสารประกอบการปฏิบัติงาน"
                        v-model="adddocuments.documentsDetail"
                        prepend-icon="mdi-format-align-justify"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-textarea>
                    </v-flex>
                    <v-flex md12>
                      <v-file-input
                        v-model="documentsLinkfiles"
                        accept=".pdf"
                        name="documentsLinkfiles"
                        color="deep-purple accent-4"
                        counter
                        label="ไฟล์ .pdf"
                        placeholder="Select your files"
                        prepend-icon="mdi-paperclip"
                        outlined
                        rounded
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="deep-purple accent-4"
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>

                          <span
                            v-else-if="index === 2"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn
                class="pa-4"
                large
                @click.stop="adddocumentsdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="success"
                @click.stop="adddocumentsSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletedocumentsdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="deletedocumentsdialog" persistent max-width="40%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="red" class="pa-2" large
                  >mdi-file-document</v-icon
                >
                <v-toolbar-title class="red--text pl-0">
                  ลบข้อมูลเอกสารประกอบการปฏิบัติงาน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  color=""
                  icon
                  @click.stop="deletedocumentsdialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>
            <v-card-text>
              <v-form ref="deletedocumentsform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap class="pa-4">
                    <v-flex xs12>
                      <h2>
                        ยืนยันการลบข้อมูล
                        <span class="red--text">{{
                          editdocuments.documentsTopic
                        }}</span>
                      </h2>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn rounded large @click.stop="deletedocumentsdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                rounded
                large
                color="red darken-3"
                @click.stop="deletedocumentsSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!--editdocumentsdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="editdocumentsdialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="warning" class="pa-2" large
                  >mdi-file-document</v-icon
                >
                <v-toolbar-title class="warning--text pl-0">
                  แก้ไขข้อมูลเอกสารประกอบการปฏิบัติงาน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="editdocumentsdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="editdocumentsform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-text-field
                        label="หัวข้อเอกสาร"
                        v-model="editdocuments.documentsTopic"
                        prepend-icon="mdi-file-document"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายการอธิบายเอกสารประกอบการปฏิบัติงาน"
                        v-model="editdocuments.documentsDetail"
                        prepend-icon="mdi-format-align-justify"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-textarea>
                    </v-flex>
                    <v-flex md12>
                      <v-layout wrap v-if="editdocuments.documentsLinkfile !== ''">
                        <v-flex md11>
                          <v-text-field
                            v-model="editdocuments.documentsLinkfile"
                            disabled
                            prepend-icon="mdi-paperclip"
                          ></v-text-field>
                        </v-flex>
                        <v-flex md1>
                          <v-btn

                            large
                            text
                            icon
                            color="red"
                            @click="deldocumentsLinkfileDialog()"
                          >
                            <v-icon>mdi-delete-circle</v-icon>
                          </v-btn>
                        </v-flex></v-layout
                      >
                    </v-flex>
                    <v-flex md12>
                      <v-file-input
                        v-if="editdocuments.documentsLinkfile === ''"
                        v-model="documentsLinkfiles"
                        accept=".pdf"
                        name="documentsLinkfiles"
                        color="deep-purple accent-4"
                        counter
                        label="ไฟล์ .pdf"
                        placeholder="Select your files"
                        prepend-icon="mdi-paperclip"
                        outlined
                        rounded
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="deep-purple accent-4"
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>

                          <span
                            v-else-if="index === 2"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn
                class="pa-4"
                large
                @click.stop="editdocumentsdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="warning"
                @click.stop="editdocumentsSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;&nbsp;แก้ไข
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>

    <v-container fluid>
      <v-snackbar
        v-model="snackbar.show"
        top
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-icon large>{{ snackbar.icon }}</v-icon>
        <v-card-text>
          <h3>{{ snackbar.text }}</h3>
        </v-card-text>

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'administrators',
  data() {
    return {
      loading: true,
      ApiKey: 'bmevec2022',
      valid: true,
      adddocumentsdialog: false,
      editdocumentsdialog: false,
      deletedocumentsdialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: '',
      },
      documentss: [],
      adddocuments: {},
      editdocuments: {},
      search: '',
      pagination: {},
      headers: [
        { text: 'หัวข้อ', align: 'center', value: 'documentsTopic' },
        { text: 'รายละเอียด', align: 'center', value: 'documentsDetail' },
        { text: 'link', align: 'center', value: 'documentsLinkfile' },
        { text: 'วันที่', align: 'center', value: 'documentsDateTime' },
        {
          text: 'แก้ไข',
          align: 'center',
          value: 'actions',
          icon: 'mdi-file-document-edit',
        },
        {
          text: 'ลบ',
          align: 'center',
          value: 'action_s',
          icon: 'mdi-delete-forever',
        },
      ],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: 'All',
          value: -1,
        },
      ],
      provinces: [],
      prefectures: [],
      documentstypes: [],
      regions: [],
      data_syslog: {},
      documentsLinkfiles: null,
      document_count: [],
    }
  },
  async mounted() {
    this.documentsQueryAll()
  },
  methods: {
    async documentsQueryAll() {
      this.loading = true
      let result = await this.$http
        .post('documents.php', {
          ApiKey: this.ApiKey,
        })
        .finally(() => (this.loading = false))
      this.documentss = result.data
    },

    async documents_countQueryAll() {
      let result = await this.$http.post('documents.php', {
        ApiKey: this.ApiKey,
        count_doc: 'Ok',
      })
      this.document_count = result.data
    },

    async documentsAdd() {
      this.adddocuments = {}
      this.documentsLinkfiles = null
      this.documents_countQueryAll()
      this.adddocumentsdialog = true
    },

    async adddocumentsSubmit() {
      let result = ''
      let uploaded = null
      if (this.$refs.adddocumentsform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
        this.adddocuments.ApiKey = this.ApiKey
        if (this.documentsLinkfiles != '') {
          let formData = new FormData()
          let filename =
            userSession.userName +
            '' +
            this.time_stamp +
            '' +
            this.document_count.count_doc +
            '.' +
            'doc.pdf'
          formData.append('ApiKey', this.ApiKey)
          formData.append('file', this.documentsLinkfiles)
          formData.append('filename', '../bmevec_files/' + filename)

          result = await this.$http.post('uploadfile.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          if (result.data.status == true) {
            this.adddocuments.documentsLinkfile = filename
            this.adddocuments.documentsDateTime = this.date_today_log
          } else {
            console.log('Error')
          }
          uploaded = true
        } else {
          uploaded = false
        }
        result = await this.$http.post(
          'documents.insert.php',
          this.adddocuments
        )
        if (result.data.status || uploaded) {
          this.snackbar.icon = 'mdi-content-save'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.documentsQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'insert'
          this.data_syslog.page_log = 'documents'
          this.data_syslog.table_log = 'documents'
          this.data_syslog.detail_log = this.adddocuments.documentsTopic
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          if (!uploaded && upload) {
            this.snackbar.icon = 'mdi-alert'
            this.snackbar.color = 'red'
            this.snackbar.text =
              'ไฟล์ที่แนบไม่ถูกต้อง กรุณาแนบไฟล์เป็น jpg หรือ jpeg เท่านั้น'
            this.snackbar.show = true
          } else {
            this.snackbar.icon = 'mdi-alert'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
        }
      }
      this.adddocumentsdialog = false
    },

    async documentsEdit(documentsID) {
      let result = await this.$http.post('documents.php', {
        ApiKey: this.ApiKey,
        documentsID: documentsID,
      })
      this.editdocuments = result.data
      this.documents_countQueryAll()
      this.editdocumentsdialog = true
    },

    async editdocumentsSubmit() {
     let result = ''
      let uploaded = null
      if (this.$refs.editdocumentsform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
        this.editdocuments.ApiKey = this.ApiKey
        if (this.documentsLinkfiles != '') {
          let formData = new FormData()
          let filename =
            userSession.userName +
            '' +
            this.time_stamp +
            '' +
            this.document_count.count_doc +
            '.' +
            'doc.pdf'
          formData.append('ApiKey', this.ApiKey)
          formData.append('file', this.documentsLinkfiles)
          formData.append('filename', '../bmevec_files/' + filename)

          result = await this.$http.post('uploadfile.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          if (result.data.status == true) {
            this.editdocuments.documentsLinkfile = filename
            this.editdocuments.documentsDateTime = this.date_today_log
          } else {
            console.log('Error')
          }
          uploaded = true
        } else {
          uploaded = false
        }
        result = await this.$http.post(
          'documents.update.php',
          this.editdocuments
        )
        if (result.data.status || uploaded) {
          this.snackbar.icon = 'mdi-content-save'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.documentsQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'update'
          this.data_syslog.page_log = 'documents'
          this.data_syslog.table_log = 'documents'
          this.data_syslog.detail_log = this.adddocuments.documentsTopic
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          if (!uploaded && upload) {
            this.snackbar.icon = 'mdi-alert'
            this.snackbar.color = 'red'
            this.snackbar.text =
              'ไฟล์ที่แนบไม่ถูกต้อง กรุณาแนบไฟล์เป็น jpg หรือ jpeg เท่านั้น'
            this.snackbar.show = true
          } else {
            this.snackbar.icon = 'mdi-alert'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
        }
      }
      this.editdocumentsdialog = false
    },

    async documentsDelete(documentsID) {
      let result = await this.$http.post('documents.php', {
        ApiKey: this.ApiKey,
        documentsID: documentsID,
      })
      this.editdocuments = result.data
      this.deletedocumentsdialog = true
      console.log(result.data)
    },

    async deletedocumentsSubmit() {
      if (this.$refs.deletedocumentsform.validate()) {
        this.editdocuments.ApiKey = this.ApiKey
        let result = await this.$http.post(
          'documents.delete.php',
          this.editdocuments
        )
        let result_delete = await this.$http.post('deletefile.php', {
          ApiKey: this.ApiKey,
          filename: '../bmevec_files/' + this.editdocuments.documentsLinkfile,
        })
        if (result.data.status == true || result_delete.data.status == true) {
          this.documents = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.documentsQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'delete'
          this.data_syslog.page_log = 'documents'
          this.data_syslog.table_log = 'documents'
          this.data_syslog.detail_log = this.editdocuments.documentsTopic
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.deletedocumentsdialog = false
      }
    },

    async deldocumentsLinkfileDialog() {
      let result_delete = await this.$http.post('deletefile.php', {
        ApiKey: this.ApiKey,
        filename: '../bmevec_files/' + this.editdocuments.documentsLinkfile,
      })
      if (result_delete.data.status == true) {
        this.editdocuments.ApiKey = this.ApiKey
        this.editdocuments.documentsLinkfile = ''
        let result = await this.$http.post(
          'documents.update.php',
          this.editdocuments
        )
        console.log(this.editdocuments)
        if (result.data.status == true) {
          this.manual_s = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        let result_doc = await this.$http.post('documents.php', {
          ApiKey: this.ApiKey,
          documentsID: this.editdocuments.documentsID,
        })
        this.editdocuments = result_doc.data
      }
    },
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    date_today_log() {
      let today = new Date()
      let dd = String(today.getDate()).padStart(2, '0')
      let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      let yyyy = today.getFullYear() + 543
      let time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      today = dd + '/' + mm + '/' + yyyy + '/' + time
      return today
    },
    time_stamp() {
      let time = Date.now()
      return time
    },
  },
  watch: {},
}
</script>
