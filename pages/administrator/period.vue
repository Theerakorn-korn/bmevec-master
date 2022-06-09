<template>
  <div>
    <v-container fluid>
      <v-card id="body_card">
        <v-card-text class="font-weight-medium">
          <h3><v-icon>mdi-calendar</v-icon> ปฏิทินปฏิบัติงาน</h3>
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
              <v-btn rounded large color="primary" @click.native="periodAdd()">
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
          :items="periods"
          :search="search"
        >
          <template v-slot:[`item.periodStart`]="{ item }">
            <div class="text-center">
              <span>
                {{
                  item.periodStart
                    | moment('add', '543 years')
                    | moment('D MMMM YYYY')
                }}
              </span>
            </div>
          </template>
          <template v-slot:[`item.periodEnd`]="{ item }">
            <div class="text-center">
              <span>
                {{
                  item.periodEnd
                    | moment('add', '543 years')
                    | moment('D MMMM YYYY')
                }}
              </span>
            </div>
          </template>
          <template v-slot:[`item.periodEnable`]="{ item }">
            <div class="text-center">
              <v-icon v-if="item.periodEnable === 'Close'" large color="black"
                >mdi-lightbulb</v-icon
              >
              <v-icon v-if="item.periodEnable === 'Open'" large color="green"
                >mdi-lightbulb-on</v-icon
              >
            </div>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div class="text-center">
              <v-btn
                small
                fab
                dark
                color="warning"
                @click.stop="periodEdit(item.periodYear, item.periodRound)"
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
              @click.stop="periodDelete(item.periodYear, item.periodRound)"
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

      <!--addperioddialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addperioddialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="green" class="pa-2" large
                  >mdi-calendar-plus</v-icon
                >
                <v-toolbar-title class="green--text pl-0">
                  เพิ่มข้อมูลปฏิทินปฏิบัติงาน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="addperioddialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="addperiodform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <v-select
                        v-model="addperiod.periodYear"
                        :items="periodYears"
                        label="ปี"
                        prepend-icon="mdi-calendar"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-select
                        :items="periodRounds"
                        v-model="addperiod.periodRound"
                        label="รอบ"
                        prepend-icon="mdi-calendar"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-dialog
                        ref="dialogstart"
                        v-model="modalstart"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="addperiod.periodStart"
                            label="วันที่เริ่มต้น"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            rounded
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="addperiod.periodStart"
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="modalstart = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialogstart.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex md6>
                      <v-dialog
                        ref="dialogend"
                        v-model="modalend"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="addperiod.periodEnd"
                            label="วันที่สิ้นสุด"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            rounded
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="addperiod.periodEnd"
                          locale="th"
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modalend = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialogend.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex md6>
                      <v-switch
                        v-model="addperiod.periodEnable_sw"
                        inset
                        label="สถานะ : เปิด/ปิด"
                        prepend-icon="mdi-eye"
                      ></v-switch>
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
                @click.stop="addperioddialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="success"
                @click.stop="addperiodSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteperioddialog -->
      <v-layout row justify-center>
        <v-dialog v-model="deleteperioddialog" persistent max-width="40%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="red" class="pa-2" large
                  >mdi-account-minus</v-icon
                >
                <v-toolbar-title class="red--text pl-0">
                  ลบข้อมูลปฏิทินปฏิบัติงาน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="deleteperioddialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>
            <v-card-text>
              <v-form ref="deleteperiodform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap class="pa-4">
                    <v-flex xs12>
                      <h2>
                        ยืนยันการลบข้อมูลผู้ใช้
                        <span class="red--text">{{
                          editperiod.periodYear
                        }} รอบ {{ editperiod.periodRound }} </span>
                      </h2>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn rounded large @click.stop="deleteperioddialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                rounded
                large
                color="red darken-3"
                @click.stop="deleteperiodSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!--editperioddialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="editperioddialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="warning" class="pa-2" large
                  >mdi-account-edit</v-icon
                >
                <v-toolbar-title class="warning--text pl-0">
                  แก้ไขข้อมูลปฏิทินปฏิบัติงาน
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="editperioddialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="editperiodform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <div class="text-center">
                        <h2>ปี {{ editperiod.periodYear }}</h2>
                      </div>
                    </v-flex>
                    <v-flex md6>
                      <div class="text-center">
                        <h2>รอบ {{ editperiod.periodRound }}</h2>
                      </div>
                    </v-flex>
                    <v-flex md6>
                      <v-dialog
                        ref="dialogstart"
                        v-model="modalstart"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editperiod.periodStart"
                            label="วันที่เริ่มต้น"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            rounded
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editperiod.periodStart"
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="modalstart = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialogstart.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex md6>
                      <v-dialog
                        ref="dialogend"
                        v-model="modalend"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editperiod.periodEnd"
                            label="วันที่สิ้นสุด"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            rounded
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editperiod.periodEnd"
                          locale="th"
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modalend = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialogend.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex md6>
                      <v-switch
                        v-model="editperiod.periodEnable_sw"
                        inset
                        label="สถานะ : เปิด/ปิด"
                        prepend-icon="mdi-eye"
                      ></v-switch>
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
                @click.stop="editperioddialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="warning"
                @click.stop="editperiodSubmit()"
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
      addperioddialog: false,
      editperioddialog: false,
      deleteperioddialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: '',
      },
      periods: [],
      addperiod: {},
      editperiod: {},
      search: '',
      pagination: {},
      headers: [
        { text: 'ปี', align: 'center', value: 'periodYear' },
        { text: 'รอบ', align: 'center', value: 'periodRound' },
        { text: 'เริ่ม', align: 'center', value: 'periodStart' },
        { text: 'สิ้นสุด', align: 'center', value: 'periodEnd' },
        { text: 'สถานะ', align: 'center', value: 'periodEnable' },
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
      period_types: [],
      data_syslog: {},
      period_types_select: [
        { text: 'ประชาสัมพันธ์', value: 'information' },
        { text: 'รายงานการควบคุมภายใน', value: 'control' },
      ],
      user: [],
      periodYears: [2565, 2566, 2567, 2568, 2569, 2570],
      periodRounds: [1, 2, 3, 4],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modalstart: false,
      modalend: false,
    }
  },
  async mounted() {
    await this.periodQueryAll()
  },
  methods: {
    async periodQueryAll() {
      this.loading = true
      let result = await this.$http
        .post('period.php', {
          ApiKey: this.ApiKey,
        })
        .finally(() => (this.loading = false))
      this.periods = result.data
    },

    async periodAdd() {
      this.addperiod = {}
      this.addperioddialog = true
    },
    async addperiodSubmit() {
      if (this.$refs.addperiodform.validate()) {
        this.addperiod.ApiKey = this.ApiKey
        if (this.addperiod.periodEnable_sw == true) {
          this.addperiod.periodEnable = 'Open'
        } else {
          this.addperiod.periodEnable = 'Close'
        }
        let result = await this.$http.post('period.insert.php', this.addperiod)

        if (result.data.status == true) {
          this.period = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.periodQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'insert'
          this.data_syslog.page_log = 'period'
          this.data_syslog.table_log = 'period'
          this.data_syslog.detail_log =
            this.addperiod.periodYear + this.addperiod.periodEnable_sw
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
          this.snackbar.show = true
          this.periodQueryAll()
        }
        this.addperioddialog = false
      }
    },
    async periodEdit(periodYear, periodRound) {
      let result = await this.$http.post('period.php', {
        ApiKey: this.ApiKey,
        periodYear: periodYear,
        periodRound: periodRound,
      })
      this.editperiod = result.data
      if (this.editperiod.periodEnable == 'Open')
        this.editperiod.periodEnable_sw = true
      else this.editperiod.periodEnable_sw = false
      this.editperioddialog = true
    },
    async editperiodSubmit() {
      if (this.$refs.editperiodform.validate()) {
        this.editperiod.ApiKey = this.ApiKey
        if (this.editperiod.periodEnable_sw == true) {
          this.editperiod.periodEnable = 'Open'
        } else {
          this.editperiod.periodEnable = 'Close'
        }
        let result = await this.$http.post('period.update.php', this.editperiod)
        console.log(result.data)
        if (result.data.status == true) {
          this.period = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.periodQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'update'
          this.data_syslog.page_log = 'period'
          this.data_syslog.table_log = 'period'
          this.data_syslog.detail_log =
            this.editperiod.periodYear + this.editperiod.periodEnable_sw
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.editperioddialog = false
      }
    },
    async periodDelete(periodYear, periodRound) {
      let result = await this.$http.post('period.php', {
        ApiKey: this.ApiKey,
       periodYear: periodYear,
        periodRound: periodRound,
      })
      this.editperiod = result.data
      this.deleteperioddialog = true
    },
    async deleteperiodSubmit() {
      if (this.$refs.deleteperiodform.validate()) {
        this.editperiod.ApiKey = this.ApiKey
        let result = await this.$http.post('period.delete.php', this.editperiod)
       console.log(result.data)
       if (result.data.status == true) {
          this.period = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.periodQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.userName
          this.data_syslog.event_log = 'delete'
          this.data_syslog.page_log = 'period'
          this.data_syslog.table_log = 'period'
          this.data_syslog.detail_log =
            this.editperiod.period_username +
            ' ' +
            this.editperiod.period_fristname +
            ' ' +
            this.editperiod.period_lastname
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.deleteperioddialog = false
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
