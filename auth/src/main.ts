import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "@/assets/main.css";

// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi"
  }
});

import router from "@/router";
// import ToastPlugin from "vue-toast-notification";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// Firebase
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "@/config/firebase";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.use(router);

app.use(vuetify);

app.use(VueToast, {
  position: "top"
});

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth()
  ]
});

app.mount("#app");