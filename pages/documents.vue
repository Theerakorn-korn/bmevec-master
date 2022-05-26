<template>
   <v-container fluid>
         <v-alert id="alert" dense type="info"> เอกสารเผยแพร่ </v-alert>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <base-subheading subheading="ประชาสัมพันธ์" />
            <v-col cols="12" lg="6" class="text-right">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                single-linehide-details
                dense
                filled
                class="mb-2"
              />
            </v-col>
            <v-data-table
              color="success"             
            >
             
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-text>
            <base-subheading subheading="แนวปฏิบัติ" />
            <base-material-alert>
              <span style="font-size: 18px"> </span>
              <v-divider class="my-4 red" style="opacity: 0.22"></v-divider>
              <span style="font-size: 16px"> </span>
              <div class="text-right">
              
              </div>
            
              <v-btn
                block
                color="info"              
                target="_blank"
                id="a"
                >คู่มือ</v-btn
              >
            </base-material-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>  

 
</template>

<script>
export default {
   layout:'core',
  data: () => ({}),

  computed: {},
  async mounted() {},

  methods: {},
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
}
</style>
