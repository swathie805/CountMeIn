import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

app.use(createPinia());
createApp(App).mount('#app');

