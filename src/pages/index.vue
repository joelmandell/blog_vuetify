<template>
  <BlogList v-model="articles" :ListArticles="true">
  </BlogList>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useBlogArticleStore } from '@/stores/blog'

const articleStore = useBlogArticleStore()
const articles = computed(() => articleStore.getArticles())
</script>
