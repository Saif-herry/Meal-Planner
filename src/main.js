import { createApp } from 'vue'
import Layout from './Layout.vue'
import './assets/tailwind.css'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Import and register vue-draggable-next
import { VueDraggableNext } from 'vue-draggable-next'

// Create the Vue application instance
const app = createApp(Layout)

// Use the router
app.use(router)

// Use the toast notification plugin
app.use(Toast, {
  position: 'bottom-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
})

// Register Draggable with a multi-word name
app.component('VueDraggable', VueDraggableNext)

// Mount the application
app.mount('#app')
