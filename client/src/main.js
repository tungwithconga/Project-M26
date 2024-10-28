import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import "./assets/main.css"

//Import Bootstrap icon
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App);
app.use(router);  
app.mount('#app');
