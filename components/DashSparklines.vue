<template>
  <div>
    <v-row>     
      <v-col cols="12" md="6">
        <v-card class="mt-4" color="#ffffff">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="teal lighten-1"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels_2"
              :value="value_2"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light black--text mb-2">User Registrations</div>
            <div class="subheading font-weight-light black--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small> mdi-clock </v-icon>
            <span class="text-caption black--text font-weight-light"
              >last registration 26 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mt-4" color="#ffffff">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="light-blue lighten-1"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels_2"
              :value="value_2"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light black--text mb-2">User Registrations</div>
            <div class="subheading font-weight-light black--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small> mdi-clock </v-icon>
            <span class="text-caption black--text font-weight-light"
              >last registration 26 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'BmevecMasterSparklines',

  data() {
    return {
      labels_1: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      value_1: [200, 675, 410, 390, 310, 460, 250, 240],
      labels_2: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      value_2: [200, 675, 410, 390, 310, 460, 250, 240],      
    }
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
