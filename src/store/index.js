import Vue from "vue";
import VueEx from "vuex";
Vue.use(VueEx);

export default new VueEx.Store({
  state: {
    currentYear: 2017,
    currentMonth: 2
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    }
  }
});
