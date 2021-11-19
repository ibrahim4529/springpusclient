<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card">
          <div class="card-header text-center">
            Register Page
          </div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger" role="alert">
              <h4 class="alert-heading">
                Error
              </h4>
              <p v-for="message, index in data.messages" :key="index">
                {{ message }}
              </p>
            </div>
            <div v-if="done" class="alert alert-success" role="alert">
              Registrasi Berhasil
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input id="email" v-model="form.email" type="email" class="form-control" placeholder="mail@domain.com">
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Nama Lengkap</label>
              <input id="name" v-model="form.name" type="text" class="form-control" placeholder="Nama">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input id="password" v-model="form.password" type="password" class="form-control" placeholder="Password">
            </div>
          </div>
          <div class="card-footer text-center">
            <button class="btn btn-primary" @click="register">
              <span v-if="loading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiClient from '~/composables/apiclient'
const form = ref({ name: '', password: '', email: '', userRole: 'USER' })
const done = ref(false)

const { loading, exec, data, error } = apiClient()
const register = () => {
  exec({
    method: 'POST',
    url: 'auth/register',
    data: form.value,
  }).then((response) => {
    if (response?.status === 200)
      done.value = true
  })
}
</script>
