<template>
  <div>
    <v-container fluid>
      <v-alert id="alert" dense type="info"> ติดต่อเรา </v-alert>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-form ref="addcontact_usform" lazy-validation>
              <v-card-text>
                <v-text-field
                  v-model="addcontact_us.contact_us_email"
                  rounded
                  prepend-icon="mdi-email"
                  name="email"
                  label="Email :"
                  type="text"
                  :rules="[(v) => !!v || 'กรุณากรอก Email']"
                  filled
                  dense
                  outlined
                >
                </v-text-field>
                <v-text-field
                  v-model="addcontact_us.contact_us_username"
                  rounded
                  prepend-icon="mdi-account"
                  name="name"
                  label="ชื่อ-นามสกุล :"
                  type="text"
                  :rules="[(v) => !!v || 'กรุณากรอก ชื่อ-นามสกุล']"
                  filled
                  dense
                  outlined
                >
                </v-text-field>
                <v-text-field
                  v-model="addcontact_us.contact_us_topic"
                  rounded
                  prepend-icon="mdi-format-title"
                  name="topic"
                  label="หัวข้อ :"
                  type="text"
                  :rules="[(v) => !!v || 'กรุณากรอก หัวข้อ']"
                  filled
                  dense
                  outlined
                >
                </v-text-field>
                <v-textarea
                  v-model="addcontact_us.contact_us_detail"
                  rounded
                  prepend-icon="mdi-details"
                  name="detail"
                  label="รายละเอีอยด :"
                  type="text"
                  :rules="[(v) => !!v || 'กรุณากรอก รายละเอียด']"
                  filled
                  dense
                  outlined
                >
                </v-textarea>
                <div class="text-center">
                  <v-btn rounded color="primary" @click="addcontact_ussubmit()">
                    <v-icon>mdi-send</v-icon> ส่ง</v-btn
                  >
                </div>
              </v-card-text>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
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
                  <v-list-item-title
                    >สำนักติดตามและประเมินผลการอาชีวศึกษา</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >ชั้น 4 สำนักงานคณะกรรมการการอาชีวศึกษา
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    กระทรวงศึกษาธิการ ถนนราชดำเนินนอก
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    เขตดุสิต กรุงเทพฯ 10300
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    โทรศัพท์ : 02-026-5555 , 02 281 5555
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="indigo"> mdi-account-multiple </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>กลุ่มติดตามและรายงานผล</v-list-item-title>
                  <v-list-item-subtitle
                    >นายสกุลชัย ลัพกิตโร
                    ผู้อำนวยการกลุ่มติดตามและรายงานผล</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >งานติดตามสถานศึกษา,
                    ติดตามการดำเนินงานเกษตร,</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >ติดตามปัญหาฝุ่นละออง PM2.5, ติดตาม COVID2019,
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    >ติดตามหลักสูตรระยะสั้น</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >โทร : 02 026 5555 ต่อ 4020 หรือ 02 021 5555 ต่อ
                    1804</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card class="mt-5">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              height="150px"
              dark
            >
            </v-img>

            <v-list two-line>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="indigo"> mdi-qrcode-scan </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title></v-list-item-title>Line official
                  <v-list-item-subtitle
                    >ชั้น 4 สำนักงานคณะกรรมการการอาชีวศึกษา
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    กระทรวงศึกษาธิการ ถนนราชดำเนินนอก
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    เขตดุสิต กรุงเทพฯ 10300
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    โทรศัพท์ : 02-026-5555 , 02 281 5555
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-snackbar
        v-model="snackbar.show"
        multi-line
        vertical
        top
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-row>
          <v-col cols="12" md="12">            
              <v-icon large>{{ snackbar.icon }}</v-icon>
          <div class="text-center">
             {{ snackbar.text }}             
              <v-btn dark @click="snackbar.show = false">Close</v-btn>            
          </div>
             
          </v-col>
        </v-row>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'core',
  name: 'BmevecMasterContact',

  data() {
    return {
      ApiKey: 'bmevec2022',
      snackbar: {
        show: false,
        color: '',
        timeout: 10000,
        icon: '',
        text: '',
      },
      addcontact_us: {},
    }
  },

  mounted() {},

  methods: {
    async addcontact_ussubmit() {
      if (this.$refs.addcontact_usform.validate()) {
        this.addcontact_us.ApiKey = this.ApiKey
        this.addcontact_us.contact_us_datetime = new Date()
        let result = await this.$http.post(
          'contact_us.insert.php',
          this.addcontact_us
        )
        if (result.data.status == true) {
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.addcontact_us = {}
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
          this.snackbar.show = true
          this.addcontact_us = {}
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#alert {
  border-radius: 30px;
  font-size: large;
}
</style>
