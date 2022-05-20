<template>

  <v-footer color="#E0E0E0" padless fixed >
    <v-row  no-gutters>      
      <v-col class="py-4 text-right white--text" cols="12">
        &copy; {{ new Date().getFullYear() }} —
        <strong>Digital Team <v-icon color="pink">mdi-heart</v-icon></strong>
      </v-col>
    </v-row>
  </v-footer>  
</template>

<script>
export default {
  name: 'BmevecMasterFooter',

  data() {
    return {
      links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us'],
    }
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
