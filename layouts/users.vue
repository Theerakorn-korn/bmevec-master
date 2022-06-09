<template>
  <v-app>  
 <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      app
      id="navigation"
      dark
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
          </v-list-item-content>
        </v-list-item>
         <v-list-item id="list">      
          <v-list-item-content>
            <div class="text-center">
              {{ user.college_user_idcard }} <br>
              {{ user.college_user_fristname + ' ' + user.college_user_lastname }}
            </div>             
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
        <v-btn rounded block @click="logout()">
          Logout
        </v-btn>
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
       ApiKey: 'bmevec2022',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'หน้าแรก',
          to: '/colleges',
        },        
        {
          icon: 'mdi-newspaper',
          title: 'ข่าวประชาสัมพันธ์',
          to: '/colleges/college_news',
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
  components: { Settings, Footers ,userlogin},
  async mounted() {
    await this.check_login()
  },

 
  methods: {
    async check_login() {
      let result
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      if(userSession=='0'){    
      this.user = 'null'   
      }else{      
      result = await this.$http.post('college_user.php', {      
        ApiKey: this.ApiKey,
        college_user_id: userSession.college_user_id
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

<style scoped>
#headerbar {
  background-color: #750606;
  border-bottom: 3px solid #d68822;
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
</style>
