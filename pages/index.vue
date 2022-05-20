<template>
  <div id="pageIndex">    
    <v-container fluid>     
      <!-- Carousel -->
      <Dashcarousel />
      <v-row>
        <v-col cols="12"> </v-col>
      </v-row>
      <DashseemoreInfo />
      <!-- Hover -->
      <Hove_progress />
      <br />
      <Sparklines />
      <dashchart />
      <!-- Card -->
      <dashdetail />
    </v-container>
    <v-spacer />
    <Footer />
  </div>
</template>

<script>
import Sparklines from '../components/DashSparklines.vue'
import Hove_progress from '../components/Dashhove_progress.vue'
import DashseemoreInfo from '../components/DashseemoreInfo.vue'
import Dashcarousel from '../components/Dashcarousel.vue'
import Dashdetail from '~/components/Dashdetail.vue'
import Dashchart from '~/components/Dashchart.vue'
import Footer from '~/components/Footers.vue'
export default {
  name: 'IndexPage',
  data() {
    return {
    
    }
  },
  methods: {},
  components: {
    Sparklines,
    Hove_progress,
    DashseemoreInfo,
    Dashcarousel,
    Dashdetail,
    Dashchart,
    Footer,
  },
}
</script>
