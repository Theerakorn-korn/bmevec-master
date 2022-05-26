<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar flat class="back-drow">
          <v-card-text>
            <div class="layout column align-center">
              <h2 class="flex my-4 white--text">ลงชื่อเข้าใช้</h2>
            </div>
          </v-card-text>
          <template v-slot:extension>
            <v-tabs v-model="tabs" grow id="tabs">
              <v-tabs-slider></v-tabs-slider>

              <v-tab class="white--text">
                <v-icon class="pa-2">mdi-school</v-icon>
                สถานศึกษา
              </v-tab>

              <v-tab class="white--text">
                <v-icon class="pa-2">mdi-domain</v-icon>
                หน่วยงานส่วนกลาง
              </v-tab>

              <v-tab-item>
                <v-card class="back-card-college">
                  <v-card-text>
                    <h2 class="pa-5 text-center green--text">
                      <v-chip color="green"> สำหรับสถานศึกษา</v-chip> 
                       <v-divider class="mx-4 ma-2 green"></v-divider>
                    </h2>
                     <v-form ref="form" lazy-validation>                
                    <v-text-field
                      color="green"
                      prepend-icon="mdi-account"
                      name="login"
                      label="ชื่อผู้ใช้งาน สถานศึกษา"
                      type="text"
                      v-model="user_name"
                      :rules="[(v) => !!v || 'กรุณากรอกชื่อผู้ใช้งาน']"
                      filled
                      rounded
                      dense
                      outlined
                    ></v-text-field>
                    <v-text-field
                      color="green"
                      name="password"
                      label="รหัสผ่าน"
                      prepend-icon="mdi-lock-outline"
                      id="password"
                      v-model="user_password"
                      filled
                      rounded
                      dense
                      :rules="[(v) => !!v || 'กรุณากรอกรหัสผ่าน']"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      counter
                      @click:append="show1 = !show1"
                      outlined
                    ></v-text-field>
                    </v-form>  
                    <div class="text-center">
                      <v-btn rounded color="primary" large @click="userLogin()">
                        <v-icon>mdi-login-variant</v-icon> เข้าสู่ระบบ</v-btn
                      >
                    </div>
                    <v-divider class="mx-4 ma-2 green"></v-divider>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card class="back-card-admin">
                  <v-card-text>
                    <h2 class="pa-5 text-center green--text">
                      <v-chip color="info"> สำหรับส่วนกลาง</v-chip>
                        <v-divider class="mx-4 ma-2 info"></v-divider>
                    </h2>

                    <v-text-field
                      color="green"
                      prepend-icon="mdi-account"
                      name="login"
                      label="ชื่อผู้ใช้งาน ส่วนกลาง"
                      type="text"
                    
                      :rules="[(v) => !!v || 'กรุณากรอกชื่อผู้ใช้งาน']"
                      filled
                      rounded
                      dense
                      outlined
                    ></v-text-field>
                    <v-text-field
                      color="green"
                      name="password"
                      label="รหัสผ่าน"
                      prepend-icon="mdi-lock-outline"
                      id="password"                   
                      filled
                      rounded
                      dense
                      :rules="[(v) => !!v || 'กรุณากรอกรหัสผ่าน']"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      counter
                      @click:append="show1 = !show1"
                      outlined
                    ></v-text-field>
                    <div class="text-center">
                      <v-btn rounded color="primary" large>
                        <v-icon>mdi-login-variant</v-icon> เข้าสู่ระบบ</v-btn
                      >
                        <v-divider class="mx-4 ma-2 info"></v-divider>
                    </div>
                    
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>
       <v-snackbar v-model="dialog" centered>
      <v-card-text>
        {{ dialog_msg }}
      </v-card-text>

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="dialog = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    </v-container>
  </div>
</template>

<script>
export default {
   layout:'core',
  name: 'BmevecMasterLogin',

  data() {
    return {
      show1: false,
      tabs: null,
      user_name: "",
      user_password: "",
       dialog: false,
      dialog_msg: "",
      snackbar_timeout: 10000
    }
  },

  mounted() {
    
  },

  methods: {
  async userLogin() {
      if (this.$refs.form.validate()) {
        let result = await this.$http.post("login.php?crud=admin", {
          user_name: this.user_name,
          user_password: this.user_password
        });
        if (result.data.user_status) {
          let user = result.data;
          user.system_lock = false;
          sessionStorage.setItem("user", JSON.stringify(user));
          if (user.user_status == "A") {
          
          /* this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = this.user_name;
          this.data_syslog.event_log = "login-admin";
          this.data_syslog.page_log = "loginAdmin";
          this.data_syslog.table_log = "";
          this.data_syslog.date_times = this.date_today_log;          

          await this.$http.post('data_syslog.insert.php', this.data_syslog) */

            sessionStorage.setItem("user", JSON.stringify(user));
           
            this.$router.push("/administrator");
            
            
          }
          //administrator IPA2
          else if (user.user_status == "B") {
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/colleges");
          } //college
          else if (user.user_status == "C") this.$router.push("/ive");
          //Vocational Education Institution
          else if (user.user_status == "D") this.$router.push("/personnel");
          //College personnel
          else if (user.user_status == "G") this.$router.push("/vecprovince");
          //Vocation College Province
          else {
            sessionStorage.clear();
            this.dialog = true;
            this.dialog_msg = "ชื่อผู้ใช้ หรือรหัสผ่าน ไม่ถูกต้อง";
          }
        }
      }
    },    
  },
}
</script>

<style lang="scss" scoped>
#tabs {
  background-color: #3abac8;
}

.card {
  border-radius: 10px 10px 10px 10px;
}
.text-field {
  border-color: #750606;
}
input {
  border-color: #3abac8;
}
.back-drow{
 background: rgb(1, 25, 53);
background: linear-gradient(0deg, rgb(35, 38, 42) 0%, rgb(80, 92, 108) 35%, rgb(175, 183, 193) 100%);
}
.back-card-college{  
background: #d7f5d3;
}
.back-card-admin{  
background: #f5e4d3;
}
</style>
