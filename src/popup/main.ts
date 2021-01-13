import { createApp } from 'vue'
import VueSvgInlinePlugin from 'vue-svg-inline-plugin'

import '../main.css'
import Button from '../components/Button.vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(VueSvgInlinePlugin)
  .component('Button', Button)
  .mount('#app')
