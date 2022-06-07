<template>
  <div>
    <v-container fluid>
      <v-alert id="alert" dense type="info"> ข้อมูลสถานศึกษา </v-alert>
      <v-row>
        <v-col cols="12" md="5">
          <v-card>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              height="150px"
              dark
            >
            </v-img>

            <v-list two-line>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="indigo"> mdi-domain </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>สถานศึกษา</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.collegeName }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ user.regionName }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    อำเภอ {{ user.prefectureName }} จังหวัด
                    {{ user.provinceName }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    E-mail : {{ user.collegeContactEmail }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-btn text icon color="warning lighten-2" @click="updateDialog()">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="7">
          <v-card>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              height="150px"
              dark
            >
            </v-img>

            <v-list two-line>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="indigo"> mdi-domain </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>ผู้ใช้งานระบบ</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-data-table
                      color="success"
                      :loading="loading"
                      :headers="headers"
                      :items="college_users"
                    >
                      <template v-slot:[`item.college_user_type`]="{ item }">
                        <div class="text-center">
                          <v-chip
                            v-if="item.college_user_type === 'information'"
                          >
                            ประชาสัมพันธ์
                          </v-chip>
                          <v-chip v-if="item.college_user_type === 'control'">
                            รายงานการควบคุมภายใน
                          </v-chip>
                        </div>
                      </template>
                    </v-data-table>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
        <!--editcollegedialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="editcollegedialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="warning" class="pa-2" large
                  >mdi-domain</v-icon
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
                      <v-text-field
                        label="สถานศึกษา"
                        v-model="editcollege.collegeName"
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
                        v-model="editcollege.collegePassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        require                       
                        rounded
                        outlined
                          :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="Confirm Password"
                        v-model="editcollege.college_user_confirmpassword"
                        prepend-icon="mdi-account-key"
                        type="password"
                        required                       
                        rounded
                        outlined
                         :rules="[(v) => v == editcollege.collegePassword]"
                     
                      ></v-text-field>
                    </v-flex>                                         
                    <v-flex md12>
                      <v-text-field
                        label="E-mail"
                        v-model="editcollege.collegeContactEmail"
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
  layout: 'colleges',
  data() {
    return {
      loading: true,
      ApiKey: 'bmevec2022',
      user: [],
      colleges: [],
      college_users: [],
      headers: [
        {
          text: 'รหัสบัตรประชาชน',
          align: 'center',
          value: 'college_user_idcard',
        },
        {
          text: 'ชื่อผู้ใช้งาน',
          align: 'center',
          value: 'college_user_username',
        },
        { text: 'ชื่อ', align: 'center', value: 'college_user_fristname' },
        { text: 'นามสกุล', align: 'center', value: 'college_user_lastname' },
        { text: 'ประเภท', align: 'center', value: 'college_user_type' },
        { text: 'E-mail', align: 'center', value: 'college_user_email' },
        { text: 'เบอร์โทร', align: 'center', value: 'college_user_tel' },
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
       snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: '',
      },
      editcollegedialog:false,
      editcollege:{},
       data_syslog: {},
    }
  },

  async mounted() {
    await this.users()
    await this.college_user()
  },

  methods: {
    async users() {
      let result
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result = await this.$http.post('college.php', {
        ApiKey: this.ApiKey,
        collegeID: userSession.collegeID,
      })
      this.user = result.data
    },

    async college_user() {
      this.loading = true
      let result = await this.$http
        .post('college_user.php', {
          ApiKey: this.ApiKey,
          college_user_code: this.user.collegeID,
        })
        .finally(() => (this.loading = false))
      this.college_users = result.data
    },
   async updateDialog(){
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
       let result = await this.$http.post('college.php', {
        ApiKey: this.ApiKey,
        collegeID: userSession.collegeID,
      })
      this.editcollege = result.data
      this.editcollege.collegePassword = ''
      this.editcollegedialog = true
    },
      async editcollegeSubmit() {
      if (this.$refs.editcollegeform.validate()) {
        this.editcollege.ApiKey = this.ApiKey
        console.log(this.editcollege)
        if (this.editcollege.collegePassword == '') delete this.editcollege.college_user_password
        let result = await this.$http.post('college.update.php', this.editcollege)
        if (result.data.status == true) {
          this.user = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.users()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.collegeID
          this.data_syslog.event_log = 'update'
          this.data_syslog.page_log = 'college_user'
          this.data_syslog.table_log = 'college_user'
          this.data_syslog.detail_log = this.editcollege.collegeID 
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
  },
  computed:{
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
  }
}
</script>

<style lang="scss" scoped></style>
