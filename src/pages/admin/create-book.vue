<script setup lang="ts">
import { Toast } from 'bootstrap'
import useApiClient from '~/composables/apiclient'
import Author from '~/dtos/author'

const { loading, exec, error, data } = useApiClient()
const form = ref({
  title: '',
  amount: 1,
  authorId: '',
})
const file = ref()
const listAuthor = ref<Author[]>()
const message = ref('')
const showMessage = (msg: string) => {
  message.value = msg
  const toastLiveExample = document.getElementById('liveToast')
  const toast = new Toast(toastLiveExample!)
  toast.show()
}
const createBook = () => {
  const formData = new FormData(document.forms.namedItem('form')!)
  exec({
    method: 'POST',
    url: 'books',
    data: formData,
    headers: {
      'Content-Type': 'multipart/data',
    },
  }).then((response) => {
    if (response?.status === 200)
      showMessage('Brhasil Menambah buku')
  })
}

const getAuthors = () => {
  exec({
    method: 'GET',
    url: 'authors',
  }).then((response) => {
    if (response?.status === 200)
      listAuthor.value = response.data.data
  })
}

onMounted(() => {
  getAuthors()
})
</script>
<template>
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
          Tambah Buku
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
          <form id="form" name="form">
            <div class="mb-3">
              <label for="title" class="form-label">Judul Buku</label>
              <input
                id="title"
                v-model="form.title"
                name="title"
                type="text"
                class="form-control"
                placeholder="Judul Buku"
              />
            </div>
            <div class="mb-3">
              <label for="amount" class="form-label">Jumlah Buku</label>
              <input
                id="amount"
                v-model="form.amount"
                type="number"
                name="amount"
                min="1"
                class="form-control"
                placeholder="Jumlah buku"
              />
            </div>
            <div class="mb-3">
              <label for="authorId" class="form-label">Penulis</label>
              <select v-if="listAuthor" id="authorId" name="authorId" class="form-select">
                <option value="">
                  Pilih Penulis
                </option>
                <option v-for="author in listAuthor" :key="author.id.toString()" :value="author.id">
                  {{ author.name }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="image" class="form-label">Gambar buku</label>
              <input id="image" :ref="file" name="image" class="form-control" type="file" />
            </div>
          </form>
        </div>
        <div class="card-footer text-center">
          <button class="btn btn-primary" @click="createBook">
            <span
              v-if="loading"
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Simpan Data Buku
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
