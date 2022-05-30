<template>
  <div>
    <v-card
      id="settings"
      class="py-2 px-4"
      color="rgba(0, 0, 0, .3)"
      dark
      link
      min-width="100"
      style="position: fixed; top: 115px; right: -35px; border-radius: 8px"
    >
      <v-icon large> mdi-card-bulleted-settings </v-icon>
    </v-card>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#settings"
      bottom
      content-class="v-settings"
      left
      nudge-left="8"
      offset-x
      origin="top right"
      transition="scale-transition"
    >
      <v-card class="text-center mb-0" width="300">
        <v-card-text>
          <strong class="mb-3 d-inline-block">Setting</strong>

          <v-item-group v-model="color">
            <v-item v-for="color in colors" :key="color" :value="color">
              <template v-slot="{ active, toggle }">
                <v-avatar
                  :class="active && 'v-settings__item--active'"
                  :color="color"
                  class="v-settings__item"
                  size="25"
                  @click="toggle"
                />
              </template>
            </v-item>
          </v-item-group>

          <v-divider class="my-4 secondary" />

          <v-row align="center" no-gutters>
            <v-col cols="auto"> Dark Mode </v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="$vuetify.theme.dark"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4 secondary" />

          <strong class="mb-3 d-inline-block">Log System</strong>
          <div class="text-center">
            <v-btn rounded large color="info">Log</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
    <v-card
      class="py-2 px-4"
      color="rgba(0, 0, 0, .3)"
      dark
      link
      min-width="100"
      style="position: fixed; top: 600px; right: -35px; border-radius: 8px"
    >
      <transition>
        <div id="pagetop" v-show="scY > 300" @click="toTop">
          <v-icon large> mdi-chevron-up-circle </v-icon>
        </div>
      </transition>
    </v-card>
  </div>
</template>

<script>
import Proxyable from '/node_modules/vuetify/lib/mixins/proxyable'
import { mapMutations, mapState } from 'vuex/'
export default {
  name: 'BmevecMasterSettings',
  mixins: [Proxyable],

  data() {
    return {
      color: '#E91E63',
      colors: [
        '#9C27b0',
        '#00CAE3',
        '#4CAF50',
        '#ff9800',
        '#E91E63',
        '#FF5252',
      ],
      image:
        'https://www.scb.co.th/content/dam/scb/personal-banking/stories-tips/traveling-thailand/traveling-thailand3.jpg',
      images: [
        'https://www.scb.co.th/content/dam/scb/personal-banking/stories-tips/traveling-thailand/traveling-thailand.jpg',
        'https://www.scb.co.th/content/dam/scb/personal-banking/stories-tips/traveling-thailand/traveling-thailand4.jpg',
        'https://www.scb.co.th/content/dam/scb/personal-banking/stories-tips/traveling-thailand/traveling-thailand2.jpg',
        'https://www.scb.co.th/content/dam/scb/personal-banking/stories-tips/traveling-thailand/traveling-thailand5.jpg',
      ],
      menu: false,
      saveImage: '',
      showImg: true,
      scTimer: 0,
      scY: 0,
    }
  },
  computed: {
    ...mapState(['barImage']),
  },

  watch: {
    color(val) {
      this.$vuetify.theme.themes[this.isDark ? 'dark' : 'light'].primary = val
    },
    showImg(val) {
      if (!val) {
        this.saveImage = this.barImage
        this.setBarImage('')
      } else if (this.saveImage) {
        this.setBarImage(this.saveImage)
        this.saveImage = ''
      } else {
        this.setBarImage(val)
      }
    },
    image(val) {
      this.setBarImage(val)
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll: function () {
      if (this.scTimer) return
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 100)
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    ...mapMutations({
      setBarImage: 'SET_BAR_IMAGE',
    }),
  },
}
</script>

<!-- <style lang="sass">
.v-settings
  .v-item-group > *
    cursor: pointer

  &__item
    border-width: 3px
    border-style: solid
    border-color: transparent !important

    &--active
      border-color: #00cae3 !important
</style> -->
