<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">        
        <Dashcarousel />
      </v-col>  
        <v-col cols="12" md="12">
        <Dashnews_BestPractice/>
      </v-col>    
      <v-col cols="12" md="12">
        <Dashnews />
      </v-col>
       <v-col cols="12" md="12">
        <Dashnews_innovetion/>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert id="alert" dense type="info"> ข่าวประชาสัมพันธ์ </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-card>
          <v-card-text>
            <base-subheading subheading="ประชาสัมพันธ์" />
            <v-col cols="12" lg="12" class="text-right">
              <v-text-field
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                single-linehide-details
                dense
                filled
                class="mb-2"
              />
            </v-col>
            <v-data-table color="success"> </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>      
    </v-row>
    
  </v-container>
</template>

<script>
import Dashcarousel from '~/components/Dashcarousel.vue'
import Dashnews from '../components/Dashnews_skill.vue'
import Dashnews_innovetion from '../components/Dashnews_innovetion.vue'
import Dashnews_BestPractice from '../components/Dashnews_BestPractice.vue'
export default {
   layout:'core',
   name:'news',
  data: () => ({}),
  computed: {},
  async mounted() {},
  methods: {},
  components: { Dashcarousel, Dashnews, Dashnews_innovetion, Dashnews_BestPractice },
}
</script>
<style>
a {
  outline: none;
  text-decoration: none;
  padding: 2px 1px 0;
}
#alert {
  border-radius: 30px;
  font-size: large;
  border-width: 5px;
  border-color: #895465;

}
</style>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>