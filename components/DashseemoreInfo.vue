<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card color="info">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
              ></v-img>

              <v-card-text>
                <h2 class="text-h6 primary--text">Magento Forests</h2>
                Travel to the best outdoor experience on planet Earth. A
                vacation you will never forget!
              </v-card-text>

              <v-card-title>
                <v-rating
                  :value="4"
                  dense
                  color="orange"
                  background-color="orange"
                  hover
                  class="mr-2"
                ></v-rating>
                <span class="primary--text text-subtitle-2">64 Reviews</span>
              </v-card-title>

              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <v-btn>See more info</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="12" md="3">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card color="info">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
              ></v-img>

              <v-card-text>
                <h2 class="text-h6 primary--text">Magento Forests</h2>
                Travel to the best outdoor experience on planet Earth. A
                vacation you will never forget!
              </v-card-text>

              <v-card-title>
                <v-rating
                  :value="4"
                  dense
                  color="orange"
                  background-color="orange"
                  hover
                  class="mr-2"
                ></v-rating>
                <span class="primary--text text-subtitle-2">64 Reviews</span>
              </v-card-title>

              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <v-btn>See more info</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="12" md="3">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card color="info">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
              ></v-img>

              <v-card-text>
                <h2 class="text-h6 primary--text">Magento Forests</h2>
                Travel to the best outdoor experience on planet Earth. A
                vacation you will never forget!
              </v-card-text>

              <v-card-title>
                <v-rating
                  :value="4"
                  dense
                  color="orange"
                  background-color="orange"
                  hover
                  class="mr-2"
                ></v-rating>
                <span class="primary--text text-subtitle-2">64 Reviews</span>
              </v-card-title>

              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <v-btn>See more info</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="12" md="3">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card color="info" class="mx-auto">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
              ></v-img>

              <v-card-text>
                <h2 class="text-h6 primary--text">Magento Forests</h2>
                Travel to the best outdoor experience on planet Earth. A
                vacation you will never forget!
              </v-card-text>

              <v-card-title>
                <v-rating
                  :value="4"
                  dense
                  color="orange"
                  background-color="orange"
                  hover
                  class="mr-2"
                ></v-rating>
                <span class="primary--text text-subtitle-2">64 Reviews</span>
              </v-card-title>

              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <v-btn>See more info</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'BmevecMasterDashseemoreInfo',

  data() {
    return {
         overlay: false,
    }
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
