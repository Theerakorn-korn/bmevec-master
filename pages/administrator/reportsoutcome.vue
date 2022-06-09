<template>
  <div>
    <v-container>
      <v-card id="body_card">
        <v-card-text class="font-weight-medium">
          <h3><v-icon>mdi-printer</v-icon> รายงานผลการปฏิบัติงาน</h3>
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
                @click.native="reportsoutcomeAdd()"
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
          :items="reportsoutcomes"
          :search="search"
        >
          <template v-slot:[`item.reportsoutcomeLinkfile`]="{ item }">
            <div class="text-center">
              <v-btn
                text
                small
                fab
                dark
                color="info"
                :href="
                  'http://localhost:8080/bmevec_files/' + item.reportsoutcomeLinkfile
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
                @click.stop="reportsoutcomeEdit(item.reportsoutcomeID)"
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
              @click.stop="reportsoutcomeDelete(item.reportsoutcomeID)"
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

      <!--addreportsoutcomedialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addreportsoutcomedialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="green" class="pa-2" large
                  >mdi-printer-plus</v-icon
                >
                <v-toolbar-title class="green--text pl-0">
                  เพิ่มข้อมูลรายงานผลการปฏิบัติงาน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="addreportsoutcomedialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="addreportsoutcomeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-text-field
                        label="หัวข้อรายงาน"
                        v-model="addreportsoutcome.reportsoutcomeTopic"
                        prepend-icon="mdi-file-reportsoutcome"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายการอธิบายรายงานผลการปฏิบัติงาน"
                        v-model="addreportsoutcome.reportsoutcomeDetail"
                        prepend-icon="mdi-format-align-justify"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-textarea>
                    </v-flex>
                    <v-flex md12>
                      <v-file-input
                        v-model="reportsoutcomeLinkfiles"
                        accept=".pdf"
                        name="reportsoutcomeLinkfiles"
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
                @click.stop="addreportsoutcomedialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="success"
                @click.stop="addreportsoutcomeSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletereportsoutcomedialog -->
      <v-layout row justify-center>
        <v-dialog v-model="deletereportsoutcomedialog" persistent max-width="40%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="red" class="pa-2" large
                  >mdi-printer</v-icon
                >
                <v-toolbar-title class="red--text pl-0">
                  ลบข้อมูลรายงานผลการปฏิบัติงาน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  color=""
                  icon
                  @click.stop="deletereportsoutcomedialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>
            <v-card-text>
              <v-form ref="deletereportsoutcomeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap class="pa-4">
                    <v-flex xs12>
                      <h2>
                        ยืนยันการลบข้อมูล
                        <span class="red--text">{{
                          editreportsoutcome.reportsoutcomeTopic
                        }}</span>
                      </h2>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn rounded large @click.stop="deletereportsoutcomedialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                rounded
                large
                color="red darken-3"
                @click.stop="deletereportsoutcomeSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!--editreportsoutcomedialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="editreportsoutcomedialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="warning" class="pa-2" large
                  >mdi-printer</v-icon
                >
                <v-toolbar-title class="warning--text pl-0">
                  แก้ไขข้อมูลรายงานผลการปฏิบัติงาน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="editreportsoutcomedialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="editreportsoutcomeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-text-field
                        label="หัวข้อรายงาน"
                        v-model="editreportsoutcome.reportsoutcomeTopic"
                        prepend-icon="mdi-file-reportsoutcome"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายการอธิบายรายงานผลการปฏิบัติงาน"
                        v-model="editreportsoutcome.reportsoutcomeDetail"
                        prepend-icon="mdi-format-align-justify"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-textarea>
                    </v-flex>
                    <v-flex md12>
                      <v-layout wrap v-if="editreportsoutcome.reportsoutcomeLinkfile !== ''">
                        <v-flex md11>
                          <v-text-field
                            v-model="editreportsoutcome.reportsoutcomeLinkfile"
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
                            @click="delreportsoutcomeLinkfileDialog()"
                          >
                            <v-icon>mdi-delete-circle</v-icon>
                          </v-btn>
                        </v-flex></v-layout
                      >
                    </v-flex>
                    <v-flex md12>
                      <v-file-input
                        v-if="editreportsoutcome.reportsoutcomeLinkfile === ''"
                        v-model="reportsoutcomeLinkfiles"
                        accept=".pdf"
                        name="reportsoutcomeLinkfiles"
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
                @click.stop="editreportsoutcomedialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="warning"
                @click.stop="editreportsoutcomeSubmit()"
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
      addreportsoutcomedialog: false,
      editreportsoutcomedialog: false,
      deletereportsoutcomedialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: '',
      },
      reportsoutcomes: [],
      addreportsoutcome: {},
      editreportsoutcome: {},
      search: '',
      pagination: {},
      headers: [
        { text: 'หัวข้อ', align: 'center', value: 'reportsoutcomeTopic' },
        { text: 'รายละเอียด', align: 'center', value: 'reportsoutcomeDetail' },
        { text: 'link', align: 'center', value: 'reportsoutcomeLinkfile' },
        { text: 'วันที่', align: 'center', value: 'reportsoutcomeDateTime' },
        {
          text: 'แก้ไข',
          align: 'center',
          value: 'actions',
          icon: 'mdi-file-reportsoutcome-edit',
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
      reportsoutcometypes: [],
      regions: [],
      data_syslog: {},
      reportsoutcomeLinkfiles: null,
      reportsoutcome_count: [],
    }
  },
  async mounted() {
    this.reportsoutcomeQueryAll()
  },
  methods: {
    async reportsoutcomeQueryAll() {
      this.loading = true
      let result = await this.$http
        .post('reportsoutcome.php', {
          ApiKey: this.ApiKey,
        })
        .finally(() => (this.loading = false))
      this.reportsoutcomes = result.data
    },

    async reportsoutcome_countQueryAll() {
      let result = await this.$http.post('reportsoutcome.php', {
        ApiKey: this.ApiKey,
        count_doc: 'Ok',
      })
      this.reportsoutcome_count = result.data
    },

    async reportsoutcomeAdd() {
      this.addreportsoutcome = {}
      this.reportsoutcomeLinkfiles = null
      this.reportsoutcome_countQueryAll()
      this.addreportsoutcomedialog = true
    },

    async addreportsoutcomeSubmit() {
      let result = ''
      let uploaded = null
      if (this.$refs.addreportsoutcomeform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
        this.addreportsoutcome.ApiKey = this.ApiKey
        if (this.reportsoutcomeLinkfiles != '') {
          let formData = new FormData()
          let filename =
            userSession.userName +
            '' +
            this.time_stamp +
            '' +
            this.reportsoutcome_count.count_doc +
            '.' +
            'report.pdf'
          formData.append('ApiKey', this.ApiKey)
          formData.append('file', this.reportsoutcomeLinkfiles)
          formData.append('filename', '../bmevec_files/' + filename)

          result = await this.$http.post('uploadfile.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          if (result.data.status == true) {
            this.addreportsoutcome.reportsoutcomeLinkfile = filename
            this.addreportsoutcome.reportsoutcomeDateTime = this.date_today_log
          } else {
            console.log('Error')
          }
          uploaded = true
        } else {
          uploaded = false
        }
        result = await this.$http.post(
          'reportsoutcome.insert.php',
          this.addreportsoutcome
        )
        if (result.data.status || uploaded) {
          this.snackbar.icon = 'mdi-content-save'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.reportsoutcomeQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'insert'
          this.data_syslog.page_log = 'reportsoutcome'
          this.data_syslog.table_log = 'reportsoutcome'
          this.data_syslog.detail_log = this.addreportsoutcome.reportsoutcomeTopic
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
      this.addreportsoutcomedialog = false
    },

    async reportsoutcomeEdit(reportsoutcomeID) {
      let result = await this.$http.post('reportsoutcome.php', {
        ApiKey: this.ApiKey,
        reportsoutcomeID: reportsoutcomeID,
      })
      this.editreportsoutcome = result.data
      this.reportsoutcome_countQueryAll()
      this.editreportsoutcomedialog = true
    },

    async editreportsoutcomeSubmit() {
     let result = ''
      let uploaded = null
      if (this.$refs.editreportsoutcomeform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
        this.editreportsoutcome.ApiKey = this.ApiKey
        if (this.reportsoutcomeLinkfiles != '') {
          let formData = new FormData()
          let filename =
            userSession.userName +
            '' +
            this.time_stamp +
            '' +
            this.reportsoutcome_count.count_doc +
            '.' +
            'doc.pdf'
          formData.append('ApiKey', this.ApiKey)
          formData.append('file', this.reportsoutcomeLinkfiles)
          formData.append('filename', '../bmevec_files/' + filename)

          result = await this.$http.post('uploadfile.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          if (result.data.status == true) {
            this.editreportsoutcome.reportsoutcomeLinkfile = filename
            this.editreportsoutcome.reportsoutcomeDateTime = this.date_today_log
          } else {
            console.log('Error')
          }
          uploaded = true
        } else {
          uploaded = false
        }
        result = await this.$http.post(
          'reportsoutcome.update.php',
          this.editreportsoutcome
        )
        if (result.data.status || uploaded) {
          this.snackbar.icon = 'mdi-content-save'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.reportsoutcomeQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'update'
          this.data_syslog.page_log = 'reportsoutcome'
          this.data_syslog.table_log = 'reportsoutcome'
          this.data_syslog.detail_log = this.addreportsoutcome.reportsoutcomeTopic
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
      this.editreportsoutcomedialog = false
    },

    async reportsoutcomeDelete(reportsoutcomeID) {
      let result = await this.$http.post('reportsoutcome.php', {
        ApiKey: this.ApiKey,
        reportsoutcomeID: reportsoutcomeID,
      })
      this.editreportsoutcome = result.data
      this.deletereportsoutcomedialog = true
      console.log(result.data)
    },

    async deletereportsoutcomeSubmit() {
      if (this.$refs.deletereportsoutcomeform.validate()) {
        this.editreportsoutcome.ApiKey = this.ApiKey
        let result = await this.$http.post(
          'reportsoutcome.delete.php',
          this.editreportsoutcome
        )
        let result_delete = await this.$http.post('deletefile.php', {
          ApiKey: this.ApiKey,
          filename: '../bmevec_files/' + this.editreportsoutcome.reportsoutcomeLinkfile,
        })
        if (result.data.status == true || result_delete.data.status == true) {
          this.reportsoutcome = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.reportsoutcomeQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'delete'
          this.data_syslog.page_log = 'reportsoutcome'
          this.data_syslog.table_log = 'reportsoutcome'
          this.data_syslog.detail_log = this.editreportsoutcome.reportsoutcomeTopic
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.deletereportsoutcomedialog = false
      }
    },

    async delreportsoutcomeLinkfileDialog() {
      let result_delete = await this.$http.post('deletefile.php', {
        ApiKey: this.ApiKey,
        filename: '../bmevec_files/' + this.editreportsoutcome.reportsoutcomeLinkfile,
      })
      if (result_delete.data.status == true) {
        this.editreportsoutcome.ApiKey = this.ApiKey
        this.editreportsoutcome.reportsoutcomeLinkfile = ''
        let result = await this.$http.post(
          'reportsoutcome.update.php',
          this.editreportsoutcome
        )
        console.log(this.editreportsoutcome)
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
        let result_doc = await this.$http.post('reportsoutcome.php', {
          ApiKey: this.ApiKey,
          reportsoutcomeID: this.editreportsoutcome.reportsoutcomeID,
        })
        this.editreportsoutcome = result_doc.data
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
