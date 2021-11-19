<script setup lang="ts">
import useApiClient from '~/composables/apiclient'
import useState from '~/store/auth'
const email = ref('')
const password = ref('')
const router = useRouter()
const { loading, exec } = useApiClient()
const { user, isLoggedIn, token } = useState()
const login = () => {
  exec({
    method: 'POST',
    url: 'auth/login',
    data: {
      email: email.value,
      password: password.value,
    },

  }).then((response) => {
    if (response?.status === 200) {
      const data = response?.data
      user.value = data.data
      isLoggedIn.value = true
      token.value = data.data.token
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data))

      router.push('/')
    }
  })
}
onMounted(() => {
  if (isLoggedIn.value)
    router.push('/')
})
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card">
          <div class="card-header text-center">
            Login Page
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input id="email" v-model="email" type="email" class="form-control" placeholder="mail@domain.com">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input id="password" v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
          </div>
          <div class="card-footer text-center">
            <button class="btn btn-primary" @click="login">
              <span v-if="loading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
