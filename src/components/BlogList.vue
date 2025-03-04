<template>
 <v-row>
  <v-col cols="12">

          <!--I reckon there could be an option prop to decide wich component to use like cardlist or expanded list and so on.... for now just a simple bool ListArticles-->
          <template v-if="ListArticles" :key="item.id" v-for="item in model">
              <BlogArticleComponent :article="item">
                <template #actions>
                  <v-btn color="primary" @click="editArticle(item)">Edit <v-icon>mdi-pen</v-icon></v-btn>
                  <v-btn color="secondary" @click="deleteArticle(item)">Delete <v-icon>mdi-delete</v-icon></v-btn>
                </template>
              </BlogArticleComponent>
          </template>
  </v-col>
</v-row>
</template>
<script setup lang="ts">
import { useBlogArticleStore } from '@/stores/blog';
import { useAppStore } from '@/stores/app';
import BlogArticleComponent from '@/components/BlogArticle'

const {ListArticles} = defineProps({
  ListArticles: Boolean
})

const appStore = useAppStore();
const articleStore = useBlogArticleStore();

const editArticle = (article: BlogArticle) => {
    appStore.showDialog("../components/BlogEdit",{article})
}

const deleteArticle = (article: BlogArticle) => {
  articleStore.deleteArticle(article);
};
const model = defineModel<BlogArticle[]>()
</script>