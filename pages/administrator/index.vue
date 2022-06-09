<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-card-title>ตั้งค่าระบบ</v-card-title>
          <v-divider></v-divider>

          <v-row>
            <v-col cols="12">
              <v-list two-line>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo"> mdi-calendar </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>(650) 555-1234</v-list-item-title>
                    <v-list-item-subtitle>Year</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo"> mdi-lightbulb-on </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title class="pl-5"
                      ><v-switch
                        v-model="switch1"
                        inset
                        label="สถานะระบบ"
                      ></v-switch
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo"> mdi-account-multiple </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>1400 Main Street</v-list-item-title>
                    <v-list-item-subtitle
                      >จำนวนผู้ใช้งานด้านประชาสัมพันธ์ของสถานศึกษา</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-card-title>ตั้งค่าข่าว</v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <v-list two-line>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo"> mdi-newspaper </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title class="pl-5"
                      ><v-switch
                        v-model="switch1"
                        inset
                        label="สถานะการเสนอข่าว"
                      ></v-switch
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo"> mdi-file-image </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>1400 Main Street</v-list-item-title>
                    <v-list-item-subtitle
                      >จำนวนรูปภาพต่อข่าว</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'administrators',
  data() {
    return {
      switch1: true,
    }
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
