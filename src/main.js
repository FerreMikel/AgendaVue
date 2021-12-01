import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from 'vuefire'

const app = createApp(App);

app.use(router);
app.use(firestorePlugin);
app.config.productionTip = false;

app.mount("#app");
