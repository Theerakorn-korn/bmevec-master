<template>
  <div>
    <v-container>
      <v-card id="body_card">
        <v-card-text class="font-weight-medium">
          <h3><v-icon>mdi-account-multiple</v-icon> ผู้ใช้งานระบบ</h3>
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
              <v-btn rounded large color="primary" @click.native="userAdd()">
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
          :items="users"
          :search="search"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div class="text-center">
              <v-btn
                small
                fab
                dark
                color="warning"
                @click.stop="userEdit(item.userID)"
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
              @click.stop="userDelete(item.userID)"
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

      <!--adduserdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="adduserdialog" persistent max-width="50%">
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
                <v-btn color="" icon @click.stop="adduserdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="adduserform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-select
                        :items="userTypes_select"
                        item-text="text"
                        item-value="value"
                        v-model="adduser.userType"
                        label="User Type"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Username"
                        v-model="adduser.userName"
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
                        v-model="adduser.userPassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        require
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        label="Confirm Password"
                        v-model="adduser.user_confirmpassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        required
                        :rules="[(v) => v == adduser.userPassword]"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Firstname"
                        v-model="adduser.userFirstname"
                        prepend-icon="mdi-account-box"
                        require
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Lastname"
                        v-model="adduser.userLastname"
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
                        v-model="adduser.userPhone"
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
                        v-model="adduser.userEmail"
                        prepend-icon="mdi-email"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      v-if="
                        adduser.userType == 'MoeProvince' ||
                        adduser.userType == 'VecProvince'
                      "
                    >
                      <v-autocomplete
                        :items="provinces"
                        item-text="provinceName"
                        item-value="provinceID"
                        prepend-icon="mdi-city"
                        v-model="adduser.provinceID"
                        label="จังหวัด"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      >
                      </v-autocomplete>
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
                @click.stop="adduserdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="success"
                @click.stop="adduserSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteuserdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="deleteuserdialog" persistent max-width="40%">
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
                <v-btn color="" icon @click.stop="deleteuserdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>
            <v-card-text>
              <v-form ref="deleteuserform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap class="pa-4">
                    <v-flex xs12>
                      <h2>
                        ยืนยันการลบข้อมูลผู้ใช้
                        <span class="red--text">{{ edituser.userName }}</span>
                      </h2>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn rounded large @click.stop="deleteuserdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                rounded
                large
                color="red darken-3"
                @click.stop="deleteuserSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!--edituserdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="edituserdialog" persistent max-width="50%">
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
                <v-btn color="" icon @click.stop="edituserdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="edituserform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-select
                        :items="userTypes_select"
                        item-text="text"
                        item-value="value"
                        v-model="edituser.userType"
                        label="User Type"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Username"
                        v-model="edituser.userName"
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
                        v-model="edituser.userPassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        label="Confirm Password"
                        v-model="edituser.user_confirmpassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Firstname"
                        v-model="edituser.userFirstname"
                        prepend-icon="mdi-account-box"
                        require
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Lastname"
                        v-model="edituser.userLastname"
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
                        v-model="edituser.userPhone"
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
                        v-model="edituser.userEmail"
                        prepend-icon="mdi-email"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      v-if="
                        edituser.userType == 'MoeProvince' ||
                        edituser.userType == 'VecProvince'
                      "
                    >
                      <v-autocomplete
                        :items="provinces"
                        item-text="provinceName"
                        item-value="provinceID"
                        prepend-icon="mdi-city"
                        v-model="edituser.provinceID"
                        label="จังหวัด"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      >
                      </v-autocomplete>
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
                @click.stop="edituserdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="warning"
                @click.stop="edituserSubmit()"
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
      adduserdialog: false,
      edituserdialog: false,
      deleteuserdialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: '',
      },
      users: [],
      adduser: {},
      edituser: {},
      search: '',
      pagination: {},
      headers: [
        { text: 'ลำดับ', align: 'center', value: 'userID' },
        { text: 'ชื่อผู้ใช้งาน', align: 'left', value: 'userName' },
        { text: 'ประเภท', align: 'center', value: 'userType' },
        { text: 'ชื่อ', align: 'left', value: 'userFirstname' },
        { text: 'นามสกุล', align: 'left', value: 'userLastname' },
        { text: 'เบอร์โทร', align: 'left', value: 'userPhone' },
        { text: 'E-mail', align: 'left', value: 'userEmail' },
        { text: 'จังหวัด', align: 'left', value: 'provinceName' },
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
      userTypes: [],
      data_syslog: {},
      userTypes_select: [
        { text: 'ผู้ดูแลระบบ', value: 'VecAdmin' },
        { text: 'ศธ', value: 'Moe' },
        { text: 'สอศ.', value: 'Vec' },
        { text: 'ศธจ', value: 'MoeProvince' },
        { text: 'อศจ', value: 'VecProvince' },
      ],
    }
  },
  async mounted() {
    let result = await this.$http.post('province.php', {
      ApiKey: this.ApiKey,
    })
    this.provinces = result.data
    this.userQueryAll()
  },
  methods: {
    async userQueryAll() {
      this.loading = true
      let result = await this.$http
        .post('user.php', {
          ApiKey: this.ApiKey,
        })
        .finally(() => (this.loading = false))
      this.users = result.data
    },
    async userAdd() {
      this.adduser = {}
      this.adduserdialog = true
    },
    async adduserSubmit() {
      if (this.$refs.adduserform.validate()) {
        this.adduser.ApiKey = this.ApiKey

        let result = await this.$http.post('user.insert.php', this.adduser)
        console.log(result.data)
        if (result.data.status == true) {
          this.user = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.userQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'insert'
          this.data_syslog.page_log = 'user'
          this.data_syslog.table_log = 'user'
          this.data_syslog.detail_log =
            this.adduser.userName +
            ' ' +
            this.adduser.userFirstname +
            ' ' +
            this.adduser.userLastname
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
          this.snackbar.show = true
          this.userQueryAll()
        }
        this.adduserdialog = false
      }
    },
    async userEdit(userID) {
      let result = await this.$http.post('user.php', {
        ApiKey: this.ApiKey,
        userID: userID,
      })
      this.edituser = result.data
      this.edituser.userPassword = ''
      this.edituserdialog = true
    },
    async edituserSubmit() {
      if (this.$refs.edituserform.validate()) {
        this.edituser.ApiKey = this.ApiKey
        if (this.edituser.userPassword == '') delete this.edituser.userPassword
        let result = await this.$http.post('user.update.php', this.edituser)
        if (result.data.status == true) {
          this.user = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.userQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'update'
          this.data_syslog.page_log = 'user'
          this.data_syslog.table_log = 'user'
          this.data_syslog.detail_log =
            this.edituser.userName +
            ' ' +
            this.edituser.userFirstname +
            ' ' +
            this.edituser.userLastname
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.edituserdialog = false
      }
    },
    async userDelete(userID) {
      let result = await this.$http.post('user.php', {
        ApiKey: this.ApiKey,
        userID: userID,
      })
      this.edituser = result.data
      this.deleteuserdialog = true
    },
    async deleteuserSubmit() {
      if (this.$refs.deleteuserform.validate()) {
        this.edituser.ApiKey = this.ApiKey
        let result = await this.$http.post('user.delete.php', this.edituser)
        if (result.data.status == true) {
          this.user = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.userQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'delete'
          this.data_syslog.page_log = 'user'
          this.data_syslog.table_log = 'user'
          this.data_syslog.detail_log =
            this.edituser.userName +
            ' ' +
            this.edituser.userFirstname +
            ' ' +
            this.edituser.userLastname
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.deleteuserdialog = false
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

