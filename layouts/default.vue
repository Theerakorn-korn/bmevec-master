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
            <!--  <v-list-item-subtitle class="text-left">
              กลุ่มงานติดตามฯ
            </v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-4 ma-2"></v-divider>
        <v-list-item-group v-model="selectedItem" color="#C8E6C9">
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
        <div class="ma-1">
          <v-btn href="http://bme.vec.go.th/" target="_blank" block rounded color="#837e7d" class="black--text">สำนักนโยบายและแผน</v-btn> 
        </div>
         <div class="ma-1">
          <v-btn href="https://bme.vec.go.th/th-th/%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99/%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B2%E0%B8%A1%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%9C%E0%B8%A5.aspx" target="_blank" block rounded color="#837e7d" class="black--text">กลุ่มงานติดตามฯ</v-btn> 
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
        <v-container>
          <Nuxt />
          <Settings />
          <Footers/>
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

export default {
  name: 'DefaultLayout',
  data() {
    return {
      selectedItem: 1,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'หน้าแรก',
          to: '/',
        },
        {
          icon: 'mdi-chart-histogram',
          title: 'ระบบ e-MVS',
          to: '/dashboardbme',
        },
        {
          icon: 'mdi-shield-half-full',
          title: 'ระบบควบคุมภายใน',
          to: '/dashboardbme',
        },
        {
          icon: 'mdi-newspaper',
          title: 'ข่าวประชาสัมพันธ์',
          to: '/inspire',
        },
        {
          icon: 'mdi-file-document',
          title: 'เอกสารเผยแพร่',
          to: '/documents',
        },
        {
          icon: 'mdi-phone-voip',
          title: 'ติดต่อสอบถาม',
          to: '/contact',
        },
        {
          icon: 'mdi-login-variant',
          title: 'เข้าสู่ระบบ',
          to: '/login',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'กลุ่มงานติดตามและประเมินผล สํานักนโยบายและแผน',
      icons: ['mdi-facebook', 'mdi-line'],
    }
  },
  components: { Settings, Footers },
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
</style>
