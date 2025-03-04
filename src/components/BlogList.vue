<template>
 <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">Blog Articles</v-card-title>
          <v-card-text>
                <template v-if="ListArticles" v-memo :key="item.id" v-for="item in model">
                    <BlogArticleComponent  :article="item">
                      <template #actions>
                        <v-btn color="primary" @click="editArticle(item)">Edit <v-icon>mdi-pen</v-icon></v-btn>
                        <v-btn color="secondary" @click="deleteArticle(item.id)">Delete <v-icon>mdi-delete</v-icon></v-btn>
                      </template>
                    </BlogArticleComponent>
                </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { defineProps} from 'vue'
import { useBlogArticleStore } from '@/stores/blog';
import { useAppStore } from '@/stores/app';
import BlogArticleComponent from '@/components/BlogArticle'

const {ListArticles} = defineProps({
  ListArticles: Boolean
})

const appStore = useAppStore();
const articleStore = useBlogArticleStore();

const editArticle = (article: BlogArticle) => {
    appStore.showDialog("BlogEdit",{article})
}

const deleteArticle = (id: string) => {
  articleStore.deleteArticle(id);
};
const model = defineModel<BlogArticle[]>()
</script>