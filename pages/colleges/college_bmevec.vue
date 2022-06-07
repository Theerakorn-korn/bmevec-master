<template>
  <div>
    <v-container fluid>
      <v-alert id="alert" dense type="info"> ข้อมูลสถานศึกษา </v-alert>
      <v-row>
        <v-col cols="12" md="4">
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
                  <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
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
                  <v-list-item-subtitle
                    >

 
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
     
    }
  },

 async mounted() {
   await this.users()       
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
   
  },
}
</script>

<style lang="scss" scoped></style>
