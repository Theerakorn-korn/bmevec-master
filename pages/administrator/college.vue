<template>
  <div>
    <v-container>
      <v-card id="body_card">
        <v-card-text class="font-weight-medium">
          <h3><v-icon>mdi-domain</v-icon> สถานศึกษา</h3>
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
              <v-btn rounded large color="primary" @click.native="collegeAdd()">
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
          :items="colleges"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div class="text-center">
              <v-btn
                small
                fab
                dark
                color="warning"
                @click.stop="collegeEdit(item.collegeID)"
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
              @click.stop="collegeDelete(item.collegeID)"
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

      <!--addcollegedialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addcollegedialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="green" class="pa-2" large
                  >mdi-domain-plus</v-icon
                >
                <v-toolbar-title class="green--text pl-0">
                  เพิ่มข้อมูลสถานศึกษา
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="addcollegedialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="addcollegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-select
                        :items="collegetypes"
                        item-text="collegetypeName"
                        item-value="collegetypeID"
                        v-model="addcollege.collegetypeID"
                        label="ประเภทสถานศึกษา"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="รหัสสถานศึกษา"
                        v-model="addcollege.collegeID"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ชื่อสถานศึกษา"
                        v-model="addcollege.collegeName"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="รหัสผ่าน"
                        v-model="addcollege.collegePassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        require
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ยืนยันรหัสผ่าน"
                        v-model="addcollege.college_confirmpassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        required
                        :rules="[(v) => v == addcollege.collegePassword]"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-switch
                        v-model="addcollege.collegeStatus_sw"
                        inset
                        label="สถานะ :"
                        prepend-icon="mdi-account-star"
                      ></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="E-mail"
                        v-model="addcollege.collegeContactEmail"
                        prepend-icon="mdi-account-box"
                        require
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-autocomplete
                        :items="provinces"
                        item-text="provinceName"
                        item-value="provinceID"
                        v-model="addcollege.provinceID"
                        label="จังหวัด"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md6>
                      <v-autocomplete
                        :items="prefectures"
                        item-text="prefectureName"
                        item-value="prefectureID"
                        v-model="addcollege.prefectureID"
                        label="อำเภอ"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-autocomplete>
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
                @click.stop="addcollegedialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="success"
                @click.stop="addcollegeSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletecollegedialog -->
      <v-layout row justify-center>
        <v-dialog v-model="deletecollegedialog" persistent max-width="40%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="red" class="pa-2" large
                  >mdi-account-minus</v-icon
                >
                <v-toolbar-title class="red--text pl-0">
                  ลบข้อมูลสถานศึกษา
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="deletecollegedialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>
            <v-card-text>
              <v-form ref="deletecollegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap class="pa-4">
                    <v-flex xs12>
                      <h2>
                        ยืนยันการลบข้อมูล
                        <span class="red--text">{{
                          editcollege.collegeName
                        }}</span>
                      </h2>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn rounded large @click.stop="deletecollegedialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                rounded
                large
                color="red darken-3"
                @click.stop="deletecollegeSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!--editcollegedialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="editcollegedialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="warning" class="pa-2" large
                  >mdi-account-edit</v-icon
                >
                <v-toolbar-title class="warning--text pl-0">
                  แก้ไขข้อมูลสถานศึกษา
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="editcollegedialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="editcollegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-select
                        :items="collegetypes"
                        item-text="collegetypeName"
                        item-value="collegetypeID"
                        v-model="editcollege.collegetypeID"
                        label="ประเภทสถานศึกษา"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>                   
                    <v-flex md6>
                      <v-text-field
                        label="ชื่อสถานศึกษา"
                        v-model="editcollege.collegeName"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-switch
                        v-model="editcollege.collegeStatus_sw"
                        inset
                        label="สถานะ :"
                        prepend-icon="mdi-account-star"
                      ></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="รหัสผ่าน"
                        v-model="editcollege.collegePassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        require
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ยืนยันรหัสผ่าน"
                        v-model="editcollege.college_confirmpassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        required
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    
                    <v-flex md12>
                      <v-text-field
                        label="E-mail"
                        v-model="editcollege.collegeContactEmail"
                        prepend-icon="mdi-account-box"
                        require
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-autocomplete
                        :items="provinces"
                        item-text="provinceName"
                        item-value="provinceID"
                        v-model="editcollege.provinceID"
                        label="จังหวัด"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md6>
                      <v-autocomplete
                        :items="prefectures"
                        item-text="prefectureName"
                        item-value="prefectureID"
                        v-model="editcollege.prefectureID"
                        label="อำเภอ"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-autocomplete>
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
                @click.stop="editcollegedialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="warning"
                @click.stop="editcollegeSubmit()"
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
      addcollegedialog: false,
      editcollegedialog: false,
      deletecollegedialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: '',
      },
      colleges: [],
      addcollege: {},
      editcollege: {},
      search: '',
      pagination: {},
      headers: [
        { text: 'ลำดับ', align: 'center', value: 'collegeID' },
        { text: 'ชื่อผู้ใช้งาน', align: 'left', value: 'collegeName' },
        { text: 'สถานะ', align: 'center', value: 'collegeStatus' },
        { text: 'E-mail', align: 'left', value: 'collegeContactEmail' },
        { text: 'อำเภอ', align: 'left', value: 'prefectureName' },
        { text: 'จังหวัด', align: 'left', value: 'provinceName' },
        { text: 'ประเภท', align: 'left', value: 'collegetypeName' },
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
      collegetypes: [],
      regions: [],
      data_syslog: {},
    }
  },
  async mounted() {
    this.collegeQueryAll()
    this.collegetypeQueryAll()
    this.provinceQueryAll()
  },
  methods: {
    async collegeQueryAll() {
      this.loading = true
      let result = await this.$http
        .post('college.php', {
          ApiKey: this.ApiKey,
        })
        .finally(() => (this.loading = false))
      this.colleges = result.data
    },
    async collegetypeQueryAll() {
      let result = await this.$http.post('collegetype.php', {
        ApiKey: this.ApiKey,
      })
      this.collegetypes = result.data
    },
    async provinceQueryAll() {
      let result = await this.$http.post('province.php', {
        ApiKey: this.ApiKey,
      })
      this.provinces = result.data
    },
    async prefectureQueryAll(provinceID) {
      let result = await this.$http.post('prefecture.php', {
        provinceID: provinceID,
        ApiKey: this.ApiKey,
      })
      this.prefectures = result.data
    },

    async collegeAdd() {
      this.addcollege = {}
      this.addcollegedialog = true
    },
    async addcollegeSubmit() {
      if (this.$refs.addcollegeform.validate()) {
        this.addcollege.ApiKey = this.ApiKey
        if (this.addcollege.collegeStatus_sw == true) {
          this.addcollege.collegeStatus = 'Open'
        } else {
          this.addcollege.collegeStatus = 'Close'
        }
        let result = await this.$http.post(
          'college.insert.php',
          this.addcollege
        )
        if (result.data.status == true) {
          this.college = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.collegeQueryAll()
          let userSession =
            JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'insert'
          this.data_syslog.page_log = 'college'
          this.data_syslog.table_log = 'college'
          this.data_syslog.detail_log = this.addcollege.collegeName
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
          this.snackbar.show = true
          this.collegeQueryAll()
        }
        this.addcollegedialog = false
      }
    },
    async collegeEdit(collegeID) {
      let result = await this.$http.post('college.php', {
        ApiKey: this.ApiKey,
        collegeID: collegeID,
      })

      this.editcollege = result.data
      if (this.editcollege.collegeStatus == 'Open')
        this.editcollege.collegeStatus_sw = true
      else this.editcollege.collegeStatus_sw = false

      this.editcollege.collegePassword = ''
      this.editcollegedialog = true
    },
    async editcollegeSubmit() {
      if (this.$refs.editcollegeform.validate()) {
        this.editcollege.ApiKey = this.ApiKey
        if (this.editcollege.collegePassword == '')
          delete this.editcollege.collegePassword
        if (this.editcollege.collegeStatus_sw == true) {
          this.editcollege.collegeStatus = 'Open'
        } else {
          this.editcollege.collegeStatus = 'Close'
        }      
        let result = await this.$http.post(
          'college.update.php',
          this.editcollege
        )
        if (result.data.status == true) {
          this.college = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.collegeQueryAll()
          let userSession =
            JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'update'
          this.data_syslog.page_log = 'college'
          this.data_syslog.table_log = 'college'
          this.data_syslog.detail_log = this.editcollege.collegeName
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.editcollegedialog = false
      }
    },
    async collegeDelete(collegeID) {
      let result = await this.$http.post('college.php', {
        ApiKey: this.ApiKey,
        collegeID: collegeID,
      })
      this.editcollege = result.data
      this.deletecollegedialog = true
    },
    async deletecollegeSubmit() {
      if (this.$refs.deletecollegeform.validate()) {
        this.editcollege.ApiKey = this.ApiKey
        let result = await this.$http.post(
          'college.delete.php',
          this.editcollege
        )
        if (result.data.status == true) {
          this.college = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.collegeQueryAll()
          let userSession =
            JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'delete'
          this.data_syslog.page_log = 'college'
          this.data_syslog.table_log = 'college'
          this.data_syslog.detail_log =
            this.editcollege.collegeName +
            ' ' +
            this.editcollege.collegeFirstname +
            ' ' +
            this.editcollege.collegeLastname
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.deletecollegedialog = false
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
    addcollegeProvinceChange() {
      return this.addcollege.provinceID
    },
    editCollegeProvinceChange() {
      return this.editcollege.provinceID
    },
  },
  watch: {
    async addcollegeProvinceChange(newVal, oldVal) {
      this.prefectureQueryAll(this.addcollege.provinceID)
    },
    async editCollegeProvinceChange(newVal, oldVal) {
      this.prefectureQueryAll(this.editcollege.provinceID)
    },
  },
}
</script>
