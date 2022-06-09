<template>
  <div>
    <v-container fluid>
      <v-card id="body_card">
        <v-card-text class="font-weight-medium">
          <h3><v-icon>mdi-account-multiple</v-icon> ผู้ใช้งานระบบ ระดับสถานศึกษา</h3>
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
              <v-btn rounded large color="primary" @click.native="college_userAdd()">
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
          :items="college_users"
          :search="search"
        >
         <template v-slot:[`item.college_user_type`]="{ item }">
            <div class="text-center">
             <v-chip v-if="item.college_user_type ==='information'">
             ประชาสัมพันธ์
             </v-chip>
              <v-chip v-if="item.college_user_type ==='control'">
             รายงานการควบคุมภายใน
             </v-chip>
            </div>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div class="text-center">
              <v-btn
                small
                fab
                dark
                color="warning"
                @click.stop="college_userEdit(item.college_user_id)"
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
              @click.stop="college_userDelete(item.college_user_id)"
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

      <!--addcollege_userdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addcollege_userdialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="green" class="pa-2" large
                  >mdi-account-multiple-plus</v-icon
                >
                <v-toolbar-title class="green--text pl-0">
                  เพิ่มข้อมูลผู้ใช้งานระบบ
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="addcollege_userdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="addcollege_userform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-select
                        :items="college_user_types_select"
                        item-text="text"
                        item-value="value"
                        v-model="addcollege_user.college_user_type"
                        label="ประเภทผู้ใช้งานระบบ"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>
                      <v-flex md6>
                      <v-text-field
                        label="รหัสบัตรประชาชน"
                        v-model="addcollege_user.college_user_idcard"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ชื่อในการเข้าใช้งาน"
                        v-model="addcollege_user.college_user_username"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Password"
                        v-model="addcollege_user.college_user_password"
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
                        label="Confirm Password"
                        v-model="addcollege_user.college_user_confirmpassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        required
                        :rules="[(v) => v == addcollege_user.college_user_password]"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ชื่อ"
                        v-model="addcollege_user.college_user_fristname"
                        prepend-icon="mdi-account-box"
                        require
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="นามสกุล"
                        v-model="addcollege_user.college_user_lastname"
                        prepend-icon="mdi-account-box"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="เบอร์โทร"
                        v-model="addcollege_user.college_user_tel"
                        prepend-icon="mdi-cellphone-basic"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="E-mail"
                        v-model="addcollege_user.college_user_email"
                        prepend-icon="mdi-email"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
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
                @click.stop="addcollege_userdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="success"
                @click.stop="addcollege_userSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletecollege_userdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="deletecollege_userdialog" persistent max-width="40%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="red" class="pa-2" large
                  >mdi-account-minus</v-icon
                >
                <v-toolbar-title class="red--text pl-0">
                  ลบข้อมูลผู้ใช้งานระบบ
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="deletecollege_userdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>
            <v-card-text>
              <v-form ref="deletecollege_userform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap class="pa-4">
                    <v-flex xs12>
                      <h2>
                        ยืนยันการลบข้อมูลผู้ใช้
                        <span class="red--text">{{ editcollege_user.college_user_username }}</span>
                      </h2>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn rounded large @click.stop="deletecollege_userdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                rounded
                large
                color="red darken-3"
                @click.stop="deletecollege_userSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!--editcollege_userdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="editcollege_userdialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="warning" class="pa-2" large
                  >mdi-account-edit</v-icon
                >
                <v-toolbar-title class="warning--text pl-0">
                  แก้ไขข้อมูลผู้ใช้งานระบบ
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="editcollege_userdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="editcollege_userform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>                 

                   <v-flex md12>
                      <v-select
                        :items="college_user_types_select"
                        item-text="text"
                        item-value="value"
                        v-model="editcollege_user.college_user_type"
                        label="ประเภทผู้ใช้งานระบบ"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>
                      <v-flex md6>
                      <v-text-field
                        label="รหัสบัตรประชาชน"
                        v-model="editcollege_user.college_user_idcard"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ชื่อในการเข้าใช้งาน"
                        v-model="editcollege_user.college_user_username"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Password"
                        v-model="editcollege_user.college_user_password"
                        prepend-icon="mdi-account-key"
                        type="password"
                        require                       
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Confirm Password"
                        v-model="editcollege_user.college_user_confirmpassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        required                       
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ชื่อ"
                        v-model="editcollege_user.college_user_fristname"
                        prepend-icon="mdi-account-box"
                        require
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="นามสกุล"
                        v-model="editcollege_user.college_user_lastname"
                        prepend-icon="mdi-account-box"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="เบอร์โทร"
                        v-model="editcollege_user.college_user_tel"
                        prepend-icon="mdi-cellphone-basic"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="E-mail"
                        v-model="editcollege_user.college_user_email"
                        prepend-icon="mdi-email"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
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
                @click.stop="editcollege_userdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="warning"
                @click.stop="editcollege_userSubmit()"
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
      addcollege_userdialog: false,
      editcollege_userdialog: false,
      deletecollege_userdialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: '',
      },
      college_users: [],
      addcollege_user: {},
      editcollege_user: {},
      search: '',
      pagination: {},
      headers: [
        { text: 'สถานศึกษา', align: 'center', value: 'collegeName' },
         { text: 'รหัสบัตรประชาชน', align: 'center', value: 'college_user_idcard' },
        { text: 'ชื่อผู้ใช้งาน', align: 'center', value: 'college_user_username' },
        { text: 'ชื่อ', align: 'center', value: 'college_user_fristname' },  
        { text: 'นามสกุล', align: 'center', value: 'college_user_lastname' },
        { text: 'ประเภท', align: 'center', value: 'college_user_type' },
        { text: 'E-mail', align: 'center', value: 'college_user_email' },
        { text: 'เบอร์โทร', align: 'center', value: 'college_user_tel' },
       
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
      college_user_types: [],
      data_syslog: {},
      college_user_types_select: [
        { text: 'ประชาสัมพันธ์', value: 'information' },
        { text: 'รายงานการควบคุมภายใน', value: 'control' },       
      ],
       user: [],
    }
  },
  async mounted() {  
    await this.college_userQueryAll()
  },
  methods: {   
    async college_userQueryAll() {
      this.loading = true
      let result = await this.$http
        .post('college_user.php', {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false))
      this.college_users = result.data          
    },


    async college_userAdd() {
      this.addcollege_user = {}
      this.addcollege_userdialog = true
    },
    async addcollege_userSubmit() {
      if (this.$refs.addcollege_userform.validate()) {
        this.addcollege_user.ApiKey = this.ApiKey
        this.addcollege_user.college_user_code = this.user.collegeID      
        let result = await this.$http.post('college_user.insert.php', this.addcollege_user)
      
        if (result.data.status == true) {
          this.college_user = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.college_userQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.collegeID
          this.data_syslog.event_log = 'insert'
          this.data_syslog.page_log = 'college_user'
          this.data_syslog.table_log = 'college_user'
          this.data_syslog.detail_log =
            this.addcollege_user.college_user_username +
            ' ' +
            this.addcollege_user.college_user_fristname +
            ' ' +
            this.addcollege_user.college_user_lastname
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
          this.snackbar.show = true
          this.college_userQueryAll()
        }
        this.addcollege_userdialog = false
      }
    },
    async college_userEdit(college_user_id) {
      let result = await this.$http.post('college_user.php', {
        ApiKey: this.ApiKey,
        college_user_id: college_user_id,
      })
      this.editcollege_user = result.data
      this.editcollege_user.college_user_password = ''
      this.editcollege_userdialog = true
    },
    async editcollege_userSubmit() {
      if (this.$refs.editcollege_userform.validate()) {
        this.editcollege_user.ApiKey = this.ApiKey
        if (this.editcollege_user.college_user_password == '') delete this.editcollege_user.college_user_password
        let result = await this.$http.post('college_user.update.php', this.editcollege_user)
        if (result.data.status == true) {
          this.college_user = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.college_userQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.collegeID
          this.data_syslog.event_log = 'update'
          this.data_syslog.page_log = 'college_user'
          this.data_syslog.table_log = 'college_user'
          this.data_syslog.detail_log =
            this.editcollege_user.college_user_username +
            ' ' +
            this.editcollege_user.college_user_fristname +
            ' ' +
            this.editcollege_user.college_user_lastname
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.editcollege_userdialog = false
      }
    },
    async college_userDelete(college_user_id) {
      let result = await this.$http.post('college_user.php', {
        ApiKey: this.ApiKey,
        college_user_id: college_user_id,
      })
      this.editcollege_user = result.data
      this.deletecollege_userdialog = true
    },
    async deletecollege_userSubmit() {
      if (this.$refs.deletecollege_userform.validate()) {
        this.editcollege_user.ApiKey = this.ApiKey
        let result = await this.$http.post('college_user.delete.php', this.editcollege_user)
        if (result.data.status == true) {
          this.college_user = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.college_userQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.collegeID
          this.data_syslog.event_log = 'delete'
          this.data_syslog.page_log = 'college_user'
          this.data_syslog.table_log = 'college_user'
          this.data_syslog.detail_log =
            this.editcollege_user.college_user_username +
            ' ' +
            this.editcollege_user.college_user_fristname +
            ' ' +
            this.editcollege_user.college_user_lastname
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.deletecollege_userdialog = false
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
  },
}
</script>

