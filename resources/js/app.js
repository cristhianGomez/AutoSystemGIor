require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuetify from 'vuetify'
import DataStorage from './store'
import {routes} from './routes'
import MainLayout from './layouts/MainLayout'
 import { initConfig } from "./middleware/init.config";

import colors from 'vuetify/lib/util/colors'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vuetify)


const store = new Vuex.Store(DataStorage)
const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'is-active',
    base: process.env.APP_URL,
    routes
})
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        base: colors.grey.darken4, // #3F51B5
      },
    },
  },
})

initConfig(store, router);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {MainLayout},
    vuetify: vuetify,
});

export default app;