<template>
<v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">Create Article</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newArticle.title"
              label="Title"
              outlined
              dense
            ></v-text-field>
            <v-textarea
              v-model="newArticle.content"
              label="Text"
              outlined
              dense
            ></v-textarea>
            <v-text-field
              v-model="newArticle.author"
              label="Author"
              outlined
              dense
            ></v-text-field>
            <v-btn color="primary" @click="addArticle">Add Article</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { useAttrs } from 'vue'
import { useBlogArticleStore } from '@/stores/blog';

const attrs = useAttrs()
const articleStore = useBlogArticleStore();
const actionHide = attrs["actionHide"];

const newArticle = ref<Omit<BlogArticle, 'id'>>({
  title: '',
  text: '',
  author: '',
  date: new Date()
});

const addArticle = () => {
  if (newArticle.value.title.trim() && newArticle.value.content.trim()) {
    articleStore.addArticle(newArticle.value);
    newArticle.value = { title: '', content: '', author: '' }; // Reset form
  }

  if(actionHide) actionHide();
};
</script>