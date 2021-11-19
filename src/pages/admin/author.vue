<template>
  <div id="liveToast" class="toast position-absolute top-0 end-0 m-2  align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {{ message }}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  <div class="card">
    <div class="card-header d-flex">
      <h5 class="card-title">
        Data Author
      </h5>
      <router-link to="/admin/create-author" class=" ms-auto btn btn-outline-success" type="submit">
        Tambah Author
      </router-link>
    </div>
    <div class="card-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr v-if="loading">
            <td colspan="4" class="text-center">
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-if="data">
          <tr v-for="author, index in data.data" :key="author.id">
            <td>{{ index + 1 }}</td>
            <td>{{ author.name }}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-sm btn-danger" @click="hapus(author.id)">
                  Hapus
                </button>
                <button type="button" class="btn btn-sm btn-warning">
                  Edit
                </button>
                <button type="button" class="btn btn-sm btn-success">
                  Lihat
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Toast } from 'bootstrap'
import useApiClient from '~/composables/apiclient'
const { loading, data, exec } = useApiClient()
const getAuthors = () => exec({
  method: 'GET',
  url: 'authors',
})
const message = ref('')
const showMessage = (msg: string) => {
  message.value = msg
  const toastLiveExample = document.getElementById('liveToast')
  const toast = new Toast(toastLiveExample!)
  toast.show()
}
const hapus = (id: Number) => {
  // eslint-disable-next-line no-alert
  alert('Are You Sure')
  exec({
    method: 'DELETE',
    url: `authors/${id}`,
  }).then((response) => {
    if (response?.status === 200) {
      getAuthors()
      showMessage('Success Delete Author')
    }
  })
}
onMounted(() => {
  getAuthors()
})
</script>
