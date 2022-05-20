<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar flat color="#837e7d">
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
                <v-card color="#FBE9E7">
                  <v-card-text>
                    <h2 class="pa-5 text-center green--text">
                      <v-chip color="green"> สำหรับสถานศึกษา</v-chip> 
                       <v-divider class="mx-4 ma-2 green"></v-divider>
                    </h2>
                  
                    <v-text-field
                      color="green"
                      prepend-icon="mdi-account"
                      name="login"
                      label="ชื่อผู้ใช้งาน สถานศึกษา"
                      type="text"
                      v-model="model.username"
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
                      v-model="model.password"
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
                    </div>
                    <v-divider class="mx-4 ma-2 green"></v-divider>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card color="#ECEFF1">
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
                      v-model="model.username"
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
                      v-model="model.password"
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
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'BmevecMasterLogin',

  data() {
    return {
      show1: false,
      tabs: null,
      model: {
        username: '8888899999',
        password: 'password',
      },
    }
  },

  mounted() {},

  methods: {},
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
</style>
