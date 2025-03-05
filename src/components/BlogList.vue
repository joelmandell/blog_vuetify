<template>
  <v-row>
    <v-col cols="12">
      <!--I reckon there could be an option prop to decide wich component to use like cardlist or expanded list and so on.... for now just a simple bool ListArticles-->
      <template v-if="ListArticles && (model?.length ?? 0) > 0" :key="item.id" v-for="item in model">
          <BlogArticleComponent :visibleTextLength="150" :article="item">
            <template #actions>
              <v-btn color="primary" :to="`/article?id=${item.id}`"><v-icon>mdi-newspaper-variant-outline</v-icon> Read</v-btn>
              <v-btn color="primary" @click="editArticle(item)"><v-icon>mdi-pen</v-icon> Edit</v-btn>
              <v-btn color="secondary" @click="deleteArticle(item)"><v-icon>mdi-delete</v-icon> Delete</v-btn>
            </template>
          </BlogArticleComponent>
      </template>
      <div v-else-if="model?.length == 0">
        <h3>No blog articles created yet. </h3>
        <p>
          Why don't you go ahead and <span class="text-decoration-underline" @click="appStore.showDialog('BlogCreate', {fullscreen:true})">create</span> one? Tell the world 🏞️
        </p>
      </div>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useBlogArticleStore } from '@/stores/blog'
import { useAppStore } from '@/stores/app'
import { useDisplay } from 'vuetify'
import BlogArticleComponent from '@/components/BlogArticle.vue'

const { mobile } = useDisplay()

const {ListArticles} = defineProps({
  ListArticles: Boolean
})

const appStore = useAppStore()
const articleStore = useBlogArticleStore()

const editArticle = (article: BlogArticle) => {
    appStore.showDialog("BlogEdit",{article,fullscreen:mobile.value,dialogWidth:480})
}

const deleteArticle = (article: BlogArticle) => {
  articleStore.deleteArticle(article)
}
const model = defineModel<BlogArticle[]>()
</script>