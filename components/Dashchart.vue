<template>
  <div>
    <v-row>
        <v-col cols="12" md="4">
          <v-card outlined color="#ffffff">
            <div id="chart">
              <apexchart
                type="donut"    
                      
                :options="chartOptions_donut"
                :series="series_donut"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card outlined color="#ffffff">
            <div id="chart">
              <apexchart
                type="donut"                
                :options="chartOptions_donut"
                :series="series_donut"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
         <v-col cols="12" md="4">
          <v-card outlined color="#ffffff">
            <div id="chart">
              <apexchart
                type="donut"                
                :options="chartOptions_donut"
                :series="series_donut"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card outlined color="#ffffff">
            <div id="chart">
              <apexchart
                type="radar"
                height="350"
                :options="chartOptions_radar"
                :series="series_radar"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card outlined color="#ffffff">
            <div id="chart">
              <apexchart
                type="radar"
                height="350"
                :options="chartOptions_radar"
                :series="series_radar"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="#ffffff">
            <div id="chart">
              <apexchart
                type="line"
                height="350"
                :options="chartOptions_line"
                :series="series_line"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="#ffffff">
            <div id="chart">
              <apexchart
                type="line"
                height="350"
                :options="chartOptions_line"
                :series="series_line"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="12">
          <v-card color="#ffffff">
            <div id="chart">
              <apexchart
                type="bar"
                height="350"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="12">
          <v-card color="#ffffff">
            <div id="chart">
              <apexchart
                type="bar"
                height="350"
                :options="chartOptions_b"
                :series="series_b"
              ></apexchart>
            </div>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: 'BmevecMasterDashchart',

  data() {
    return {
       series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: "PRODUCT D",
          data: [21, 7, 25, 13, 22, 8]
        }
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          type: "datetime",
          categories: [
            "01/01/2011 GMT",
            "01/02/2011 GMT",
            "01/03/2011 GMT",
            "01/04/2011 GMT",
            "01/05/2011 GMT",
            "01/06/2011 GMT"
          ]
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },

      series_b: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chartOptions_b: {
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct"
          ]
        },
        yaxis: {
          title: {
            text: "$ (thousands)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "$ " + val + " thousands";
            }
          }
        }
      },

      series_donut: [44, 55, 41, 17, 15],
      chartOptions_donut: {
        chart: {
          width: 380,
          type: "donut"
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "gradient"
        },
        legend: {
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex];
          }
        },
        title: {
          text: "Gradient Donut with custom Start-angle"
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },

      series_radar: [
        {
          name: "Series 1",
          data: [20, 100, 40, 30, 50, 80, 33]
        }
      ],
      chartOptions_radar: {
        chart: {
          height: 350,
          type: "radar"
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          radar: {
            size: 140,
            polygons: {
              strokeColors: "#e9e9e9",
              fill: {
                colors: ["#f8f8f8", "#fff"]
              }
            }
          }
        },
        title: {
          text: "Radar with Polygon Fill"
        },
        colors: ["#FF4560"],
        markers: {
          size: 4,
          colors: ["#fff"],
          strokeColor: "#FF4560",
          strokeWidth: 2
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },
        xaxis: {
          categories: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ]
        },
        yaxis: {
          tickAmount: 7,
          labels: {
            formatter: function(val, i) {
              if (i % 2 === 0) {
                return val;
              } else {
                return "";
              }
            }
          }
        }
      },

      series_line: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chartOptions_line: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Product Trends by Month",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
          ]
        }
      }
    };
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
