import { reactive, toRefs } from 'vue'

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

const authState = reactive({
  user,
  isLoggedIn: !!user,
  token: localStorage.getItem('token'),
})

export default function useState() {
  return {
    ...toRefs(authState),
  }
}
