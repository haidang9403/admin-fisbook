
import './assets/base.css'
import './assets/style.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../node_modules/flowbite-vue/dist/index.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Popper from 'vue3-popper'

import store from './store'

const app = createApp(App)

app.component("Popper", Popper)
app.use(store)
app.use(router)
app.mount('#app')
