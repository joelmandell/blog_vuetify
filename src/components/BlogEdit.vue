<template>
<v-row v-if="editingArticle">
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">Edit Article</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="editingArticle.title"
              label="Title"
              outlined
              dense
            ></v-text-field>
            <v-textarea
              v-model="editingArticle.content"
              label="Content"
              outlined
              dense
            ></v-textarea>
            <v-text-field
              v-model="editingArticle.author"
              label="Author"
              outlined
              dense
            ></v-text-field>
            <v-btn color="success" @click="saveEditedArticle">Save Changes</v-btn>
            <v-btn color="error" @click="cancelEdit" class="ml-2">Cancel</v-btn>
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
const editingArticle = JSON.parse(JSON.stringify(attrs["article"] ?? "{}"));

const saveEditedArticle = () => {
  if (editingArticle) {
    articleStore.updateArticle(editingArticle);
  }

  if(actionHide) actionHide();
};

const cancelEdit = () => {
  if(actionHide) actionHide();
};
</script>