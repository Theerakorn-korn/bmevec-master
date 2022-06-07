<template>
  <div>
    <v-container fluid>
      <v-card id="body_card">
        <v-card-text class="font-weight-medium">
          <h3><v-icon>mdi-domain</v-icon> ข่าวประชาสัมพันธ์</h3>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                single-line
                hide-details
                rounded
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="text-right">
              <v-btn rounded large color="primary" @click.native="newsAdd()">
                <v-icon class="pa-2">mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <hr color="#d68822" />
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="newss"
          :search="search"
        >
          <template v-slot:[`item.news_type`]="{ item }">
            <div class="text-center">
              <v-chip v-if="item.news_type === 'Best'" color="#1A237E" dark>
                <v-icon color="#ffcc00" class="pa-2">mdi-trophy-award</v-icon>
                Best Practice</v-chip
              >
              <v-chip v-if="item.news_type === 'Skill'" color="#004D40" dark>
                <v-icon color="#ffcc00" class="pa-2">mdi-account-star</v-icon>
                การแข่งขันทักษะวิชาชีพ</v-chip
              >
              <v-chip
                v-if="item.news_type === 'Innovation'"
                color="#3E2723"
                dark
              >
                <v-icon color="#ffcc00" class="pa-2">mdi-creation</v-icon>
                นวัตกรรมสิ่งประดิษฐ์</v-chip
              >
            </div>
          </template>

          <template v-slot:[`item.news_pic`]="{ item }">
            <div class="text-center">
              <v-btn
                rounded
                text
                color="info"
                @click="UploadImageDialog(item.news_id)"
              >
                <v-chip v-if="item.news_status === 'send'" color="#EF9A9A" dark>
                  <v-icon color="#ffcc00" class="pa-2">mdi-cloud-upload</v-icon>
                  เพิ่มภาพ</v-chip
                >
              </v-btn>
              <v-chip v-if="item.news_status === 'post'" color="#7CB342" dark>
                ประกาศ</v-chip
              >
            </div>
          </template>

          <template v-slot:[`item.news_status`]="{ item }">
            <div class="text-center">
              <v-chip v-if="item.news_status === 'send'" color="#EF9A9A" dark>
                ขออนุญาตประกาศ</v-chip
              >
              <v-chip v-if="item.news_status === 'check'" color="#FFF59D" dark>
                ตรวจสอบ</v-chip
              >
              <v-chip v-if="item.news_status === 'post'" color="#7CB342" dark>
                ประกาศ</v-chip
              >
            </div>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div class="text-center">
              <v-btn
                small
                fab
                dark
                color="warning"
                @click.stop="newsEdit(item.news_id)"
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:[`item.action_s`]="{ item }">
            <v-btn
              class="text-center"
              small
              fab
              dark
              color="red"
              @click.stop="newsDelete(item.news_id)"
            >
              <v-icon dark> mdi-delete </v-icon>
            </v-btn>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
            >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert
          >
        </v-data-table>
      </v-card>

      <!--addnewsdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addnewsdialog" persistent max-width="60%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="green" class="pa-2" large>mdi-newspaper</v-icon>
                <v-toolbar-title class="green--text pl-0">
                  เพิ่มข่าวประชาสัมพันธ์
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="addnewsdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="addnewsform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <v-select
                        :items="newstypes"
                        item-text="text"
                        item-value="value"
                        v-model="addnews.news_type"
                        label="ประเภทข่าว"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="หัวข้อ"
                        v-model="addnews.news_topic"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายละเอียด : "
                        v-model="addnews.news_detail"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                        counter
                        maxlength="250"
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn
                class="pa-4"
                large
                @click.stop="addnewsdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="success"
                @click.stop="addnewsSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!--addimagedialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addimagedialog" persistent max-width="60%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="green" class="pa-2" large>mdi-newspaper</v-icon>
                <v-toolbar-title class="green--text pl-0">
                  เพิ่มรูปภาพประจำข่าว
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="addimagedialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="addimageform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-banner two-line>
                        <v-avatar
                          slot="icon"
                          color="deep-purple accent-4"
                          size="40"
                        >
                          <v-icon icon="mdi-lock" color="white">
                            mdi-camera
                          </v-icon>
                        </v-avatar>

                        <h3>{{ editnews.news_topic }}</h3>
                        <h5>{{ editnews.news_detail }}</h5>

                        <template v-slot:actions>
                          <h5 color="deep-purple accent-4">
                            {{ editnews.news_date }}
                          </h5>
                        </template>
                      </v-banner>
                    </v-flex>
                    <v-flex md10>
                      <v-file-input
                        v-model="news_pics"
                        accept="image/*"
                        name="news_pics"
                        color="deep-purple accent-4"
                        counter
                        label="รูปที่ 1 "
                        placeholder="Select your files"
                        prepend-icon="mdi-paperclip"
                        outlined
                        rounded
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="deep-purple accent-4"
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>

                          <span
                            v-else-if="index === 2"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                    </v-flex>
                    <v-flex md2>
                      <v-btn
                        class="pa-4"
                        large
                        color="success"
                        @click.stop="addnews_imageSubmit()"
                        rounded
                      >
                        <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
                      </v-btn>
                    </v-flex>
                    <v-flex md12>
                      <v-row>
                        <v-col
                          v-for="item in news_pictures"
                          :key="item.news_pic_id"
                          class="d-flex child-flex"
                          cols="4"
                        >
                          <v-img
                            :src="
                              'http://localhost:8080/bmevec_files/' +
                              item.news_pic_name
                            "
                            :lazy-src="
                              'http://localhost:8080/bmevec_files/' +
                              item.news_pic_name
                            "
                            aspect-ratio="1"
                            class="grey lighten-2"
                          >
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                                ></v-progress-circular>
                              </v-row>
                            </template>
                            <v-btn
                              class="ma-2"
                              text
                              icon
                              color="red"
                              @click="deleteimageDialog(item.news_pic_id)"
                            >
                              <v-icon>mdi-delete-circle</v-icon>
                            </v-btn>
                          </v-img>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn
                class="pa-4"
                large
                @click.stop="addimagedialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteimagedialog -->
      <v-layout row justify-center>
        <v-dialog v-model="deleteimagedialog" persistent max-width="40%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="red" class="pa-2" large
                  >mdi-account-minus</v-icon
                >
                <v-toolbar-title class="red--text pl-0">
                  ลบภาพนี้
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="deleteimagedialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>
            <v-card-text>
              <v-form ref="deleteimageform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap class="pa-4">
                    <v-flex xs12>
                      <h2 class="text-center">ยืนยันการลบข้อมูลภาพ</h2>
                      <v-img
                        :src="
                          'http://localhost:8080/bmevec_files/' +
                          deletenews_pictures.news_pic_name
                        "
                        :lazy-src="
                          'http://localhost:8080/bmevec_files/' +
                          deletenews_pictures.news_pic_name
                        "
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn rounded large @click.stop="deleteimagedialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                rounded
                large
                color="red darken-3"
                @click.stop="deleteimageSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletenewsdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="deletenewsdialog" persistent max-width="40%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="red" class="pa-2" large
                  >mdi-account-minus</v-icon
                >
                <v-toolbar-title class="red--text pl-0">
                  ลบข้อมูลสถานศึกษา
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="deletenewsdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>
            <v-card-text>
              <v-form ref="deletenewsform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap class="pa-4">
                    <v-flex xs12>
                      <h2 v-if="result_picture_counts.id_main_count==='0'">
                        ยืนยันการลบข้อมูล
                        <span class="red--text"> หัวข้อ : {{ editnews.news_topic }}</span>
                      </h2>

                      <h2 v-else>
                        กรุณาลบรูปภาพในหัวข้อดังกล่าวก่อนการลบหัวข้อข่าว
                        <span class="red--text"> จำนวนภาพ : {{ result_picture_counts.id_main_count }} ภาพ</span>
                      </h2>


                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn rounded large @click.stop="deletenewsdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
              v-if="result_picture_counts.id_main_count==='0'"
                rounded
                large
                color="red darken-3"
                @click.stop="deletenewsSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!--editnewsdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="editnewsdialog" persistent max-width="50%">
          <v-card id="layout">
            <v-card id="card_model" class="px-5 py-3">
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-icon color="warning" class="pa-2" large
                  >mdi-account-edit</v-icon
                >
                <v-toolbar-title class="warning--text pl-0">
                  แก้ไขข้อมูลสถานศึกษา
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="" icon @click.stop="editnewsdialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
            </v-card>

            <v-card-text>
              <v-form ref="editnewsform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <v-select
                        :items="newstypes"
                        item-text="text"
                        item-value="value"
                        v-model="editnews.news_type"
                        label="ประเภทข่าว"
                        prepend-icon="mdi-account-star"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="หัวข้อ"
                        v-model="editnews.news_topic"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-textarea
                        label="รายละเอียด : "
                        v-model="editnews.news_detail"
                        prepend-icon="mdi-account"
                        required
                        :rules="[(v) => !!v || '']"
                        rounded
                        outlined
                        counter
                        maxlength="250"
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions id="card_model_footer" class="pa-4">
              <v-spacer></v-spacer>
              <v-btn
                class="pa-4"
                large
                @click.stop="editnewsdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                class="pa-4"
                large
                color="warning"
                @click.stop="editnewsSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;&nbsp;แก้ไข
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>

    <v-container fluid>
      <v-snackbar
        v-model="snackbar.show"
        top
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-icon large>{{ snackbar.icon }}</v-icon>
        <v-card-text>
          <h3>{{ snackbar.text }}</h3>
        </v-card-text>

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'colleges',
  data() {
    return {
      loading: true,
      ApiKey: 'bmevec2022',
      valid: true,
      addnewsdialog: false,
      editnewsdialog: false,
      deletenewsdialog: false,
      addimagedialog: false,
      deleteimagedialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 1000,
        icon: '',
        text: '',
      },
      newss: [],
      addnews: {},
      editnews: [],
      search: '',
      pagination: {},
      news_pics: null,
      news_pics_2: null,
      news_pics_3: null,

      headers: [
        { text: 'ประเภท', align: 'center', value: 'news_type' },
        { text: 'ผู้ประกาศ', align: 'center', value: 'news_users' },
        { text: 'หัวข้อ', align: 'center', value: 'news_topic' },
        { text: 'วันที่', align: 'center', value: 'news_date' },
        { text: 'ภาพประกอบ', align: 'center', value: 'news_pic' },
        { text: 'สถานะ', align: 'center', value: 'news_status' },
        {
          text: 'แก้ไข',
          align: 'center',
          value: 'actions',
          icon: 'mdi-file-document-edit',
        },
        {
          text: 'ลบ',
          align: 'center',
          value: 'action_s',
          icon: 'mdi-delete-forever',
        },
      ],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: 'All',
          value: -1,
        },
      ],
      provinces: [],
      prefectures: [],
      newstypes: [
        { text: 'การแข่งขันทักษะวิชาชีพ', value: 'Skill' },
        { text: 'นวัตกรรมสิ่งประดิษฐ์', value: 'Innovation' },
        { text: 'Best Practice', value: 'Best' },
      ],
      regions: [],
      data_syslog: {},
      user: [],
      news_pictures: [],
      deletenews_pictures: [],
      addimage: {},
      result_picture_counts: [],
      deletenews:{},
    }
  },
  async mounted() {
    await this.users()
    await this.newsQueryAll()
  },
  methods: {
    async users() {
      let result
      let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
      result = await this.$http.post('college.php', {
        ApiKey: this.ApiKey,
        collegeID: userSession.collegeID,
      })
      this.user = result.data
    },

    async newsQueryAll() {
      this.loading = true
      let result = await this.$http
        .post('news.php', {
          ApiKey: this.ApiKey,
          news_college: this.user.collegeID,
        })
        .finally(() => (this.loading = false))
      this.newss = result.data
    },

    async newsAdd() {
      this.addnews = {}
      this.addnewsdialog = true
    },

    async UploadImageDialog(news_id) {
      let result = await this.$http.post('news.php', {
        ApiKey: this.ApiKey,
        news_id: news_id,
      })
      this.editnews = result.data

      let result_picture = await this.$http.post('news_picture.php', {
        ApiKey: this.ApiKey,
        news_id_main: news_id,
      })
      this.news_pictures = result_picture.data

      let result_picture_count = await this.$http.post('news_picture.php', {
        ApiKey: this.ApiKey,
        news_id_main: news_id,
        count_news_id_main: 'OK',
      })
      this.result_picture_counts = result_picture_count.data

      this.news_pics = null
      this.addimagedialog = true
    },

    async addnews_imageSubmit() {
      let result = ''
      let uploaded = null
      if (this.result_picture_counts.id_main_count >= 6) {
        this.snackbar.icon = 'mdi-alert'
        this.snackbar.color = 'red'
        this.snackbar.text = 'ท่านสามารถบันทึกรูปภาพได้ไม่เกิน 6 ภาพ'
        this.snackbar.show = true
      } else {
        if (this.$refs.addimageform.validate()) {
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.addimage.ApiKey = this.ApiKey
          if (this.news_pics != '') {
            let formData = new FormData()
            let filename =
              userSession.collegeID +
              '' +
              this.time_stamp +
              '' +
              this.editnews.news_type +
              '' +
              this.result_picture_counts.id_main_count +
              '.' +
              'news.jpg'
            formData.append('ApiKey', this.ApiKey)
            formData.append('file', this.news_pics)
            formData.append('filename', '../bmevec_files/' + filename)

            result = await this.$http.post('uploadfile.php', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })

            if (result.data.status == true) {
              this.addimage.news_id_main = this.editnews.news_id
              this.addimage.news_id_college = this.editnews.news_college
              this.addimage.news_pic_name = filename
              this.addimage.news_pic_datetime = this.date_today_log
            } else {
              console.log('Error')
            }
            uploaded = true
          } else {
            uploaded = false
          }
          result = await this.$http.post(
            'news_picture.insert.php',
            this.addimage
          )        
          if (result.data.status || uploaded) {
            this.snackbar.icon = 'mdi-content-save'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true

            let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
            this.data_syslog.ApiKey = this.ApiKey
            this.data_syslog.user_account = userSession.collegeID
            this.data_syslog.event_log = 'insert'
            this.data_syslog.page_log = 'news_picture'
            this.data_syslog.table_log = 'news_picture'
            this.data_syslog.detail_log =
              this.editnews.news_id + this.addimage.news_pic_name
            this.data_syslog.date_times = this.date_today_log
            await this.$http.post('data_syslog.insert.php', this.data_syslog)
          } else {
            if (!uploaded && upload) {
              this.snackbar.icon = 'mdi-alert'
              this.snackbar.color = 'red'
              this.snackbar.text =
                'ไฟล์ที่แนบไม่ถูกต้อง กรุณาแนบไฟล์เป็น jpg หรือ jpeg เท่านั้น'
              this.snackbar.show = true
            } else {
              this.snackbar.icon = 'mdi-alert'
              this.snackbar.color = 'red'
              this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
              this.snackbar.show = true
            }
          }
          let result_picture = await this.$http.post('news_picture.php', {
            ApiKey: this.ApiKey,
            news_id_main: this.editnews.news_id,
          })
          this.news_pictures = result_picture.data
          this.news_pics = null

          let result_picture_count = await this.$http.post('news_picture.php', {
            ApiKey: this.ApiKey,
            news_id_main: this.editnews.news_id,
            count_news_id_main: 'OK',
          })
          this.result_picture_counts = result_picture_count.data
        }
      }
    },

    async deleteimageDialog(news_pic_id) {
      let result_picture = await this.$http.post('news_picture.php', {
        ApiKey: this.ApiKey,
        news_pic_id: news_pic_id,
      })
      this.deletenews_pictures = result_picture.data
      this.deleteimagedialog = true
    },

    async deleteimageSubmit() {
      if (this.$refs.deleteimageform.validate()) {
        this.deletenews_pictures.ApiKey = this.ApiKey
        console.log(this.deletenews_pictures)
        let result = await this.$http.post('news_picture.delete.php', this.deletenews_pictures)
        if (result.data.status == true) {
          this.news = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true          
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.collegeID
          this.data_syslog.event_log = 'delete'
          this.data_syslog.page_log = 'news_picture'
          this.data_syslog.table_log = 'news_picture'
          this.data_syslog.detail_log = this.deletenews_pictures.news_pic_id
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        let result_picture = await this.$http.post('news_picture.php', {
            ApiKey: this.ApiKey,
            news_id_main: this.editnews.news_id,
          })
          this.news_pictures = result_picture.data
          this.news_pics = null
          
        this.deleteimagedialog = false
      }
    },

    async addnewsSubmit() {
      if (this.$refs.addnewsform.validate()) {
        this.addnews.ApiKey = this.ApiKey
        this.addnews.news_college = this.user.collegeID
        this.addnews.news_users = this.user.collegeID
        this.addnews.news_date = this.date_today_log
        this.addnews.news_status = 'send'
        console.log(this.addnews)
        let result = await this.$http.post('news.insert.php', this.addnews)

        if (result.data.status == true) {
          this.college_user = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.newsQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.collegeID
          this.data_syslog.event_log = 'insert'
          this.data_syslog.page_log = 'news'
          this.data_syslog.table_log = 'news'
          this.data_syslog.detail_log = this.addnews.news_topic
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
          this.snackbar.show = true
          this.newsQueryAll()
        }
        this.addnewsdialog = false
      }
    },

    async newsEdit(news_id) {
      let result = await this.$http.post('news.php', {
        ApiKey: this.ApiKey,
        news_id: news_id,
      })
      this.editnews = result.data

      this.editnewsdialog = true
    },

    async editnewsSubmit() {
      if (this.$refs.editnewsform.validate()) {
        this.editnews.ApiKey = this.ApiKey
        this.editnews.news_college = this.user.collegeID
        this.editnews.news_users = this.user.collegeID
        this.editnews.news_date = this.date_today_log
        let result = await this.$http.post('news.update.php', this.editnews)
        if (result.data.status == true) {
          this.news = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.newsQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.collegeID
          this.data_syslog.event_log = 'update'
          this.data_syslog.page_log = 'news'
          this.data_syslog.table_log = 'news'
          this.data_syslog.detail_log = this.editnews.newsName
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.editnewsdialog = false
      }
    },

    async newsDelete(news_id) {
      let result = await this.$http.post('news.php', {
        ApiKey: this.ApiKey,
        news_id: news_id,
      })
      this.editnews = result.data

       let result_picture_count = await this.$http.post('news_picture.php', {
        ApiKey: this.ApiKey,
        news_id_main: news_id,
        count_news_id_main: 'OK',
      })
      this.result_picture_counts = result_picture_count.data

      this.deletenewsdialog = true
      console.log(result.data)
    },

    async deletenewsSubmit() {
      if (this.$refs.deletenewsform.validate()) {
        this.editnews.ApiKey = this.ApiKey   
        console.log(this.deletenews)
        let result = await this.$http.post('news.delete.php', this.editnews)       
        if (result.data.status == true) {
          this.news = result.data
          this.snackbar.icon = 'mdi-font-awesome'
          this.snackbar.color = 'success'
          this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
          this.snackbar.show = true
          this.newsQueryAll()
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0
          this.data_syslog.ApiKey = this.ApiKey
          this.data_syslog.user_account = userSession.collegeID
          this.data_syslog.event_log = 'delete'
          this.data_syslog.page_log = 'news'
          this.data_syslog.table_log = 'news'
          this.data_syslog.detail_log = this.editnews.news_topic
          this.data_syslog.date_times = this.date_today_log
          await this.$http.post('data_syslog.insert.php', this.data_syslog)
        } else {
          this.snackbar.icon = 'mdi-close-network'
          this.snackbar.color = 'red'
          this.snackbar.text = 'ลบข้อมูลผิดพลาด'
          this.snackbar.show = true
        }
        this.deletenewsdialog = false
      }
    },
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    date_today_log() {
      let today = new Date()
      let dd = String(today.getDate()).padStart(2, '0')
      let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      let yyyy = today.getFullYear() + 543
      let time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      today = dd + '/' + mm + '/' + yyyy + '/' + time
      return today
    },
    time_stamp() {
      let time = Date.now()
      return time
    },
  },
  watch: {},
}
</script>
