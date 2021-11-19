<script setup lang="ts">
import { PropType } from '@vue/runtime-core'
import Book from '~/dtos/book'
const props = defineProps({
  book: Object as PropType<Book>,
})
</script>

<template>
  <div class="card mb-3">
    <img :src="book?.img ? 'http://localhost:8080/img/'+book.img : ''" class="img-fluid img-thumbnail" alt="Book Image">
    <div class="card-body">
      <h5 class="card-title">
        {{ props.book?.title }}
      </h5>
      <p class="card-text">
        {{ props.book?.author.name }} {{ props.book?.amount }}
      </p>
    </div>
    <div class="card-footer">
      <a href="" class="btn btn-primary">Pinjam</a>
    </div>
  </div>
</template>
