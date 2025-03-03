<template>
  <BlogList v-model="articles" :ListArticles="true">
  </BlogList>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useBlogArticleStore } from '@/stores/blog';
import type { BlogArticle } from '@/types'; // Import types

const articleStore = useBlogArticleStore();
const articles = computed(() => articleStore.getArticles());
</script>
