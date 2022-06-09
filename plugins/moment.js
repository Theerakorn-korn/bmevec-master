import Vue from 'vue'
 
const moment = require('moment')
require('moment/locale/th')
 
Vue.use(require('vue-moment'), {
    moment
})