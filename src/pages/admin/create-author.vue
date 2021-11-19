<script setup lang="ts">
import { Toast } from 'bootstrap'
import useApiClient from '~/composables/apiclient'

const { loading, exec, error, data } = useApiClient()
const form = ref({
  name: '',
})
const message = ref('')
const showMessage = (msg: string) => {
  message.value = msg
  const toastLiveExample = document.getElementById('liveToast')
  const toast = new Toast(toastLiveExample!)
  toast.show()
}
const createAuthor = () => {
  exec({
    method: 'POST',
    url: 'authors',
    data: form.value,
  }).then((response) => {
    if (response?.status === 200)
      showMessage('Berhasil menambah author')
  })
}

</script>
<template>
  <div class="container">
    <div id="liveToast" class="toast position-absolute top-0 end-0 m-2  align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card">
          <div class="card-header text-center">
            Tambah Author
          </div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger" role="alert">
              <h4 class="alert-heading">
                Error
              </h4>
              <p v-for="messageData, index in data.messages" :key="index">
                {{ messageData }}
              </p>
            </div>
            <form id="form" name="form">
              <div class="mb-3">
                <label for="name" class="form-label">Nama Author</label>
                <input
                  id="name"
                  v-model="form.name"
                  name="name"
                  type="text"
                  class="form-control"
                  placeholder="Nama Author"
                />
              </div>
            </form>
          </div>
          <div class="card-footer text-center">
            <button class="btn btn-primary" @click="createAuthor">
              <span
                v-if="loading"
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Simpan Data Author
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
