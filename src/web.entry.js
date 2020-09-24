import Vue from 'vue';
import "./style.scss";

import VueEx from "vuex";
Vue.use(VueEx);

import moment from "moment-timezone";
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, "$moment", {get() { return this.$root.moment; }});

import App from "./components/App.vue";

new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  store: {
    state: {
      currentYear: 2017,
      currentMonth: 2
    },
    mutations: {

    }
  }
});
