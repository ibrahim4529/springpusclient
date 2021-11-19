// register vue composition api globally
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'

import 'bootstrap'
import './styles/all.scss'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated())
      next()

    else
      next('/login')
  }
  else {
    next()
  }
})

function isAuthenticated() {
  return !!localStorage.getItem('user')
}

app.use(router)
app.mount('#app')
