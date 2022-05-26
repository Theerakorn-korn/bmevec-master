import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
const request = axios.create({
    baseURL: 'http://localhost:8080/bmevec_api',
    /* baseURL: '/vesarapi', */
})
Vue.use(VueAxios, request)
