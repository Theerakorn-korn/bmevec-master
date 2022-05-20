<template>
  <div>
    <v-container>
      <v-bottom-navigation
        v-model="value"
        :background-color="color"
        dark
        horizontal
        id="bottom-navigation"
      >
        <v-btn id="btn">
          <span><v-icon>mdi-arrow-right-drop-circle</v-icon> 2563 </span>
        </v-btn>
        <v-btn id="btn">
          <span><v-icon>mdi-arrow-right-drop-circle</v-icon> 2564 </span>
        </v-btn>
        <v-btn id="btn">
          <span><v-icon>mdi-arrow-right-drop-circle</v-icon> 2565 </span>
        </v-btn>
      </v-bottom-navigation>
      <v-divider class="mx-4 ma-2 blue"></v-divider>
      <v-alert id="alert" dense type="info">
        1.ข้อมูลตัวชี้วัดแผนการศึกษาชาติ
      </v-alert>
      <v-row>
        <v-col cols="12" md="12">
          <v-card id="card" class="pa-5">
            ข้อมูลนักเรียน
            <v-row>
              <v-col cols="12" md="4" class="pa-5">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card color="#ffffff" class="pa-5">
                      <apexchart
                        type="donut"
                        width="400px"
                        :options="options"
                        :series="options.series"
                      ></apexchart>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-card color="#ffffff" class="pa-5">
                      <apexchart
                        type="donut"
                        width="400px"
                        :options="options"
                        :series="options.series"
                      ></apexchart>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-card color="#ffffff" class="pa-5">
                      <apexchart
                        type="donut"
                        width="400px"
                        :options="options"
                        :series="options.series"
                      ></apexchart>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="8" class="pa-5">
                <v-card color="#ffffff" class="pa-5">
                  <apexchart
                    type="bar"
                    height="350"
                    :options="chartOptions_b"
                    :series="series_b"
                  ></apexchart>
                </v-card>
                <v-row>
                  <v-col cols="12" md="6" class="pa-5">
                    <v-card color="#ffffff">
                      <apexchart
                        type="donut"
                        width="400px"
                        :options="options"
                        :series="options.series"
                      ></apexchart>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6" class="pa-5">
                    <v-card color="#ffffff">
                      <apexchart
                        type="donut"
                        width="400px"
                        :options="options"
                        :series="options.series"
                      ></apexchart>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="12">
          <v-card id="card" class="pa-5">
            ข้อมูลครูและบุคลากร
            <v-row>
              <v-col cols="12" md="4" class="pa-5">
                <v-card color="#ffffff" class="pa-5">
                  <apexchart
                    type="donut"
                    width="400px"
                    :options="options"
                    :series="options.series"
                  ></apexchart>
                </v-card>
              </v-col>
              <v-col cols="12" md="8" class="pa-5">
                <v-card color="#ffffff" class="pa-5">
                  <apexchart
                    type="bar"
                    height="350"
                    :options="chartOptions"
                    :series="series"
                  ></apexchart>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="12">
          <v-card id="card" class="pa-5">
            ข้อมูลหน่วยงานและเครือข่ายที่ร่วมจัดการอาชีวศึกษา
            <v-row>
              <v-col cols="12" md="4" class="pa-5">
                <v-card color="#ffffff" class="pa-5">
                  <apexchart
                    type="donut"
                    width="400px"
                    :options="options"
                    :series="options.series"
                  ></apexchart>
                </v-card>
              </v-col>
              <v-col cols="12" md="8" class="pa-5">
                <v-card color="#ffffff" class="pa-5">
                  <apexchart
                    type="bar"
                    height="350"
                    :options="Columnbaroption"
                    :series="Columnbaroption.series"
                  ></apexchart>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="12">
          <v-card id="card" class="pa-5">
            ข้อมูลสิ่งประดิษฐ์และนวัตกรรม งานวิจัย
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="mx-4 ma-2 blue"></v-divider>
      <v-alert id="alert" dense type="info">
        2.ผลสัมฤทธิ์การใช้จ่ายงบประมาณของสถานศึกษา
      </v-alert>
      <v-row>
        <v-col cols="12" md="12">
          <v-card id="card"></v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'BmevecMasterDashboardbme',

  data() {
    return {
      value: 2,
      options: {
        title: {
          text: 'ร้อยละของผู้เรียนพิการ',
        },
        series: [50, 55, 41, 17, 15],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'Grep'],
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: '50px',
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  fontSize: '24px',
                  color: '#2787AB',
                },
              },
            },
          },
        },
      },
      series: [
        {
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'PRODUCT D',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chartOptions: {
        title: {
          text: 'ร้อยละของผู้เรียนพิการ',
        },
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '01/01/2011 GMT',
            '01/02/2011 GMT',
            '01/03/2011 GMT',
            '01/04/2011 GMT',
            '01/05/2011 GMT',
            '01/06/2011 GMT',
          ],
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },

      series_b: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],

      chartOptions_b: {
        title: {
          text: 'ร้อยละของผู้เรียนพิการ',
        },
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
          ],
        },
        yaxis: {
          title: {
            text: '$ (thousands)',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands'
            },
          },
        },
      },

      Columnbaroption: {
        series: [
          {
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
          },
        ],
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + '%'
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
        },
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          position: 'top',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + '%'
            },
          },
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444',
          },
        },
      },
    }
  },

  mounted() {},

  methods: {},
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return '#01579B'
        case 1:
          return '#006064'
        case 2:
          return '#1B5E20'
        case 3:
          return 'indigo'
        default:
          return 'blue-grey'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#btn {
  width: 200px;
  border-radius: 5px;
  font-size: large;
}
#bottom-navigation {
  border-radius: 30px;
}
#alert {
  border-radius: 30px;
  font-size: large;
}
#card {
  background-color: rgb(204, 204, 204);
  color: rgb(0, 0, 0);
  font-size: large;
  padding: 5px;
}
</style>
