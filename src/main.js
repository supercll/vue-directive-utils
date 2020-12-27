import Vue from "vue";
import App from "./App.vue";
import "./directives/v-throttle";
import "./directives/v-lazyImg";

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount("#app");
