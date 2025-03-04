<template>
  <BlogArticleComponent :article="article">
      <template #actions>
          <v-btn color="primary" @click="editArticle(article)"><v-icon>mdi-pen</v-icon> Edit</v-btn>
          <v-btn color="secondary" @click="deleteArticle(article)"><v-icon>mdi-delete</v-icon> Delete</v-btn>
      </template>
  </BlogArticleComponent>
</template>

<script lang="ts" setup>
import BlogArticleComponent from '@/components/BlogArticle.vue'
import {useRoute,useRouter} from 'vue-router'
import { computed } from 'vue'
import { useBlogArticleStore } from '@/stores/blog'
import { useAppStore } from '@/stores/app'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const appStore = useAppStore()

const route = useRoute()
const router = useRouter()

const id = ref<string|undefined>(route.query?.id?.toString())

const articleStore = useBlogArticleStore()
const article = computed<BlogArticle|undefined>(() => articleStore.getArticle(id.value))

const editArticle = (article: BlogArticle | undefined) => {
    appStore.showDialog("../components/BlogEdit",{article,fullscreen:mobile.value,dialogWidth:480})
}

const deleteArticle = (article: BlogArticle | undefined) => {
  articleStore.deleteArticle(article)
  router.push("/")
}
</script>
