<template>
  <div>
    <v-container>
      <v-card id="body_card">
        <v-card-text class="font-weight-medium">
          <h3><v-icon>mdi-book</v-icon> หนังสือแจ้งสถานศึกษา</h3>
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
                @click.native="noticesAdd()"
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
          :items="noticess"
          :search="search"
        >
          <template v-slot:[`item.noticesLinkfile`]="{ item }">
            <div class="text-center">
              <v-btn
                text
                small
                fab
                dark
                color="info"
                :href="
                  'http://localhost:8080/bmevec_files/' + item.noticesLinkfile
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
                @click.stop="noticesEdit(item.noticesID)"
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
              @click.stop="noticesDelete(item.noticesID)"
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

      <!--addnoticesdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addnoticesdialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="green" class="pa-2" large
                  >mdi-book-plus</v-icon
                >
                <v-toolbar-title class="green--text pl-0">
                  เพิ่มข้อมูลหนังสือแจ้งสถานศึกษา
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="addnoticesdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="addnoticesform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-text-field
                        label="หนังสือแจ้ง"
                        v-model="addnotices.noticesTopic"
                        prepend-icon="mdi-file-notice"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายการอธิบายหนังสือแจ้งสถานศึกษา"
                        v-model="addnotices.noticesDetail"
                        prepend-icon="mdi-format-align-justify"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-textarea>
                    </v-flex>
                    <v-flex md12>
                      <v-file-input
                        v-model="noticesLinkfiles"
                        accept=".pdf"
                        name="noticesLinkfiles"
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
                @click.stop="addnoticesdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="success"
                @click.stop="addnoticesSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletenoticesdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="deletenoticesdialog" persistent max-width="40%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="red" class="pa-2" large
                  >mdi-book</v-icon
                >
                <v-toolbar-title class="red--text pl-0">
                  ลบข้อมูลหนังสือแจ้งสถานศึกษา
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  color=""
                  icon
                  @click.stop="deletenoticesdialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>
            <v-card-text>
              <v-form ref="deletenoticesform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap class="pa-4">
                    <v-flex xs12>
                      <h2>
                        ยืนยันการลบข้อมูล
                        <span class="red--text">{{
                          editnotices.noticesTopic
                        }}</span>
                      </h2>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn rounded large @click.stop="deletenoticesdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                rounded
                large
                color="red darken-3"
                @click.stop="deletenoticesSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!--editnoticesdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="editnoticesdialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="warning" class="pa-2" large
                  >mdi-book</v-icon
                >
                <v-toolbar-title class="warning--text pl-0">
                  แก้ไขข้อมูลหนังสือแจ้งสถานศึกษา
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="editnoticesdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="editnoticesform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-text-field
                        label="หนังสือแจ้ง"
                        v-model="editnotices.noticesTopic"
                        prepend-icon="mdi-file-notice"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายการอธิบายหนังสือแจ้งสถานศึกษา"
                        v-model="editnotices.noticesDetail"
                        prepend-icon="mdi-format-align-justify"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-textarea>
                    </v-flex>
                    <v-flex md12>
                      <v-layout wrap v-if="editnotices.noticesLinkfile !== ''">
                        <v-flex md11>
                          <v-text-field
                            v-model="editnotices.noticesLinkfile"
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
                            @click="delnoticesLinkfileDialog()"
                          >
                            <v-icon>mdi-delete-circle</v-icon>
                          </v-btn>
                        </v-flex></v-layout
                      >
                    </v-flex>
                    <v-flex md12>
                      <v-file-input
                        v-if="editnotices.noticesLinkfile === ''"
                        v-model="noticesLinkfiles"
                        accept=".pdf"
                        name="noticesLinkfiles"
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
                @click.stop="editnoticesdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="warning"
                @click.stop="editnoticesSubmit()"
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
      addnoticesdialog: false,
      editnoticesdialog: false,
      deletenoticesdialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: '',
      },
      noticess: [],
      addnotices: {},
      editnotices: {},
      search: '',
      pagination: {},
      headers: [
        { text: 'หัวข้อหนังสือแจ้ง', align: 'center', value: 'noticesTopic' },
        { text: 'รายละเอียดหนังสือ', align: 'center', value: 'noticesDetail' },
        { text: 'link', align: 'center', value: 'noticesLinkfile' },
        { text: 'วันที่', align: 'center', value: 'noticesDateTime' },
        {
          text: 'แก้ไข',
          align: 'center',
          value: 'actions',
          icon: 'mdi-file-notice-edit',
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
      noticestypes: [],
      regions: [],
      data_syslog: {},
      noticesLinkfiles: null,
      notice_count: [],
    }
  },
  async mounted() {
    this.noticesQueryAll()
  },
  methods: {
    async noticesQueryAll() {
      this.loading = true
      let result = await this.$http
        .post('notices.php', {
          ApiKey: this.ApiKey,
        })
        .finally(() => (this.loading = false))
      this.noticess = result.data
    },

    async notices_countQueryAll() {
      let result = await this.$http.post('notices.php', {
        ApiKey: this.ApiKey,
        count_doc: 'Ok',
      })
      this.notice_count = result.data
    },

    async noticesAdd() {
      this.addnotices = {}
      this.noticesLinkfiles = null
      this.notices_countQueryAll()
      this.addnoticesdialog = true
    },

    async addnoticesSubmit() {
      let result = ''
      let uploaded = null
      if (this.$refs.addnoticesform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
        this.addnotices.ApiKey = this.ApiKey
        if (this.noticesLinkfiles != '') {
          let formData = new FormData()
          let filename =
            userSession.userName +
            '' +
            this.time_stamp +
            '' +
            this.notice_count.count_doc +
            '.' +
            'doc.pdf'
          formData.append('ApiKey', this.ApiKey)
          formData.append('file', this.noticesLinkfiles)
          formData.append('filename', '../bmevec_files/' + filename)

          result = await this.$http.post('uploadfile.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          if (result.data.status == true) {
            this.addnotices.noticesLinkfile = filename
            this.addnotices.noticesDateTime = this.date_today_log
          } else {
            console.log('Error')
          }
          uploaded = true
        } else {
          uploaded = false
        }
        result = await this.$http.post(
          'notices.insert.php',
          this.addnotices
        )
        if (result.data.status || uploaded) {
          this.snackbar.icon = 'mdi-content-save'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.noticesQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'insert'
          this.data_syslog.page_log = 'notices'
          this.data_syslog.table_log = 'notices'
          this.data_syslog.detail_log = this.addnotices.noticesTopic
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
      this.addnoticesdialog = false
    },

    async noticesEdit(noticesID) {
      let result = await this.$http.post('notices.php', {
        ApiKey: this.ApiKey,
        noticesID: noticesID,
      })
      this.editnotices = result.data
      this.notices_countQueryAll()
      this.editnoticesdialog = true
    },

    async editnoticesSubmit() {
     let result = ''
      let uploaded = null
      if (this.$refs.editnoticesform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
        this.editnotices.ApiKey = this.ApiKey
        if (this.noticesLinkfiles != '') {
          let formData = new FormData()
          let filename =
            userSession.userName +
            '' +
            this.time_stamp +
            '' +
            this.notice_count.count_doc +
            '.' +
            'doc.pdf'
          formData.append('ApiKey', this.ApiKey)
          formData.append('file', this.noticesLinkfiles)
          formData.append('filename', '../bmevec_files/' + filename)

          result = await this.$http.post('uploadfile.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          if (result.data.status == true) {
            this.editnotices.noticesLinkfile = filename
            this.editnotices.noticesDateTime = this.date_today_log
          } else {
            console.log('Error')
          }
          uploaded = true
        } else {
          uploaded = false
        }
        result = await this.$http.post(
          'notices.update.php',
          this.editnotices
        )
        if (result.data.status || uploaded) {
          this.snackbar.icon = 'mdi-content-save'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.noticesQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'update'
          this.data_syslog.page_log = 'notices'
          this.data_syslog.table_log = 'notices'
          this.data_syslog.detail_log = this.addnotices.noticesTopic
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
      this.editnoticesdialog = false
    },

    async noticesDelete(noticesID) {
      let result = await this.$http.post('notices.php', {
        ApiKey: this.ApiKey,
        noticesID: noticesID,
      })
      this.editnotices = result.data
      this.deletenoticesdialog = true
      console.log(result.data)
    },

    async deletenoticesSubmit() {
      if (this.$refs.deletenoticesform.validate()) {
        this.editnotices.ApiKey = this.ApiKey
        let result = await this.$http.post(
          'notices.delete.php',
          this.editnotices
        )
        let result_delete = await this.$http.post('deletefile.php', {
          ApiKey: this.ApiKey,
          filename: '../bmevec_files/' + this.editnotices.noticesLinkfile,
        })
        if (result.data.status == true || result_delete.data.status == true) {
          this.notices = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.noticesQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'delete'
          this.data_syslog.page_log = 'notices'
          this.data_syslog.table_log = 'notices'
          this.data_syslog.detail_log = this.editnotices.noticesTopic
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.deletenoticesdialog = false
      }
    },

    async delnoticesLinkfileDialog() {
      let result_delete = await this.$http.post('deletefile.php', {
        ApiKey: this.ApiKey,
        filename: '../bmevec_files/' + this.editnotices.noticesLinkfile,
      })
      if (result_delete.data.status == true) {
        this.editnotices.ApiKey = this.ApiKey
        this.editnotices.noticesLinkfile = ''
        let result = await this.$http.post(
          'notices.update.php',
          this.editnotices
        )
        console.log(this.editnotices)
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
        let result_doc = await this.$http.post('notices.php', {
          ApiKey: this.ApiKey,
          noticesID: this.editnotices.noticesID,
        })
        this.editnotices = result_doc.data
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
