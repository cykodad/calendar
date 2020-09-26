import Vue from "vue";
import VueEx from "vuex";
Vue.use(VueEx);

import moment from "moment-timezone";
moment.tz.setDefault("UTC");

import Axios from "axios";

export default new VueEx.Store({
  state: {
    currentYear: 2020,
    currentMonth: 9,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    eventFormDate: moment(),
    events: []
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    eventFormPos(state, payload) {
      state.eventFormPosX = payload.x;
      state.eventFormPosY = payload.y;
    },
    eventFormActive(state, payload) {
      state.eventFormActive = payload;
    },
    addEvent(state, payload) {
      state.events.push(payload);
    },
    eventFormDate(state, payload) {
      state.eventFormDate = payload;
    }
  },
  actions: {
    addEvent(context, payload) {
      return new Promise((resolve, reject) => {
        let obj = {
          description: payload,
          date: context.state.eventFormDate
        };
        Axios.post("/add_event", obj).then(response => {
          if (response.status === 200) {
            context.commit("addEvent", obj);
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }
});
