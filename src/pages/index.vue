<template>
  <BlogList v-model="articles" :ListArticles="true">
  </BlogList>
</template>

<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'
import { useBlogArticleStore } from '@/stores/blog'

const articleStore = await useBlogArticleStore()
const articles = await computedAsync(async () => await articleStore.getArticles())
console.log(articles.value)
</script>
