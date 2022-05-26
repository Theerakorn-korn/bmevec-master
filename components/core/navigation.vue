<template>
    <div>
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
        <!-- Administrator -->
          <v-list-item-group        
          color="#C8E6C9"
          v-if="user !== 'null'"
        >
          <v-list-item
            v-for="(item, i) in items_admin"
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
    </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: 'BmevecMasterNavigation',

    data() {
        return {
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
          to: '/news',
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
      user: [],  
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>