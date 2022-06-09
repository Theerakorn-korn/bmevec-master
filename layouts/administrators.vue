<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      app
      id="navigation"
      dark
      class="back-drow"
    >
      <v-list shaped>
        <v-list-item id="list-item-head">
          <v-list-item-avatar class="align-self-center">
            <v-img src="/ovec.png" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h5 text-left">
              BmeVEC
            </v-list-item-title>
            <!--  <v-list-item-subtitle class="text-left">
              กลุ่มงานติดตามฯ
            </v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
        <v-list-item id="list">      
          <v-list-item-content>
            <v-list-item-title class="text-center">
              {{ user.userName }}
            </v-list-item-title>
             <v-list-item-subtitle class="text-center">
               <v-chip color="info">  {{ user.userType }} </v-chip>
              
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-4 ma-2"></v-divider>

        <v-list-item-group color="#C8E6C9">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon color="#750606">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="ma-2">
          <v-btn rounded block @click="logout()"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar dark id="headerbar" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-app>
        <v-container fluid>
          <Nuxt />
          <Settings />
        </v-container>
      </v-app>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Settings from '~/components/Settings.vue'
import Footers from '../components/Footers.vue'
import userlogin from '../pages/login.vue'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'หน้าแรก',
          to: '/administrator',
        },
        {
          icon: 'mdi-account-settings',
          title: 'ปฏิทินปฏิบัติงาน',
          to: '/administrator/period',
        },
       
         {
          icon: 'mdi-account-settings',
          title: 'ผู้ใช้งานระบบ',
          to: '/administrator/user',
        },
          {
          icon: 'mdi-domain',
          title: 'สถานศึกษา',
          to: '/administrator/college',
        },
        {
          icon: 'mdi-domain',
          title: 'ผู้ใช้งานระบบสถานศึกษา',
          to: '/administrator/college_user',
        },

         {
          icon: 'mdi-newspaper',
          title: 'ข่าวสถานศึกษา',
          to: '/administrator/college_news',
        },
         {
          icon: 'mdi-file-document',
          title: 'เอกสารประกอบการปฏิบัติงาน',
          to: '/administrator/documents',
        },
          {
          icon: 'mdi-printer',
          title: 'รายงานผลการปฏิบัติงาน',
          to: '/administrator/reportsoutcome',
        },
          {
          icon: 'mdi-book',
          title: 'หนังสือแจ้งสถานศึกษา/คำสั่ง',
          to: '/administrator/notices',
        },
       
      ],
    
  

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'กลุ่มงานติดตามและประเมินผล สํานักนโยบายและแผน',
      icons: ['mdi-facebook', 'mdi-line'],
      user: [],
    }
  },
  components: { Settings, Footers, userlogin },
  async mounted() {
    await this.check_login()
  },

  methods: {
    async check_login() {
      let result
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      if (userSession == '0') {
        this.user = 'null'
      } else {
        result = await this.$http.post('admin.php', {
          userName: userSession.userName,
          ApiKey: 'bmevec2022',
        })
        this.user = result.data
       
      }
    },
    logout() {
      sessionStorage.clear()
      this.$router.push('/')
      this.check_login()
    },
  },
}
</script>
<style scoped>
.v-application {
  background-color: #ececec;
}
</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Niramit:wght@300;700&display=swap');
* {
  font-family: 'Niramit', sans-serif;
}
</style>

<style>
#body_card {
  color: #750606;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  background-color: #f9d64b;
  border-bottom: 3px solid #d68822;
  border-top: 3px solid #d68822;
}
#layout {
  border-radius: 15px;
}
#card_model {
  background-color: #ddcfcf;
  border-bottom: 3px solid #d68822;
  border-radius: 15px 15px 0px 0px;
  background-size: 120%;
}
#card_model_footer {
  background-color: #ddcfcf;
  border-top: 3px solid #d68822;
}
#headerbar {
   background-color: #750606;
  background: linear-gradient(270deg, #590303 0%, #7e1010 35%, #750606 100%); border-bottom: 3px solid #d68822;
}
#navigation {
  background-color: #837e7d;
  border-radius: 0px 0px 0px 0px;
}
#list-item-head {
  background-color: #750606;
  border-bottom: 3px solid #d68822;
}
#list{
  background-color: #3b3a3a;
}
.back-drow{
 background: rgb(1, 25, 53);
background: linear-gradient(0deg, rgb(35, 38, 42) 0%, rgb(80, 92, 108) 35%, rgb(175, 183, 193) 100%);
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(107, 105, 105);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #7c9cdb;
}
</style>
