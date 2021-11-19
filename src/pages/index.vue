<script setup lang="ts">
import BookCard from '~/components/BookCard.vue'
import useApiClient from '~/composables/apiclient'
import Author from '~/dtos/author'
import Book from '~/dtos/book'
const { loading, exec } = useApiClient()
const books = ref<Book[]>()
const authors = ref<Author[]>()
const bookName = ref('')
const authorId = ref('')
const getBooks = () => {
  exec({
    method: 'GET',
    url: 'books',
  }).then((response) => {
    if (response?.status === 200)
      books.value = response.data.data
  })
}
const getAuthors = () => {
  exec({
    method: 'GET',
    url: 'authors',
  }).then((response) => {
    if (response?.status === 200)
      authors.value = response.data.data
  })
}

const filter = () => {
  exec({
    method: 'GET',
    url: authorId.value ? `books/filter?title=${bookName.value}&authorId=${authorId.value}` : `books/search?title=${bookName.value}`,
  }).then((response) => {
    if (response?.status === 200)
      books.value = response.data.data
  })
}
const resetFilter = () => {
  bookName.value = ''
  authorId.value = ''
  getBooks()
}
onMounted(() => {
  getAuthors()
  getBooks()
})
</script>

<template>
  <div class="row">
    <div class="col-md-3">
      <div class="card">
        <div class="card-header">
          <h6 class="text-center">
            Filter
          </h6>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="name" class="form-label">Nama Buku</label>
            <input
              id="name"
              v-model="bookName"
              name="name"
              type="text"
              class="form-control"
              placeholder="Nama Buku"
            />
          </div>
          <div class="mb-3">
            <label for="authorId" class="form-label">Author</label>
            <select v-if="authors" id="author" v-model="authorId" name="authorId" class="form-select">
              <option value="">
                Filter Menggunakan Author
              </option>
              <option v-for="author in authors" :key="author.id.toString()" :value="author.id">
                {{ author.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-footer">
          <div class="d-flex">
            <button class="btn btn-primary" @click="resetFilter">
              Reset Filter
            </button>
            <button class="btn btn-warning ms-auto" @click="filter">
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <div v-if="books" class="row">
        <div v-for="book in books" :key="book.id.toString()" class="col-md-4">
          <BookCard :book="book" />
        </div>
      </div>
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<route>
{
  meta: {
    requiresAuth: true
  }
}
</route>
