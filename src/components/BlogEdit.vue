<template>
  <v-row v-if="editingArticle">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">Edit Article</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="validForm" lazy-validation>
            <v-text-field
              v-model="editingArticle.title"
              :rules="titleRules"
              label="Title"
              outlined
              dense
              required
            ></v-text-field>

            <v-textarea
              v-model="editingArticle.text"
              :rules="textRules"
              label="Text"
              outlined
              dense
              required
            ></v-textarea>

            <v-text-field
              v-model="editingArticle.author"
              :rules="authorRules"
              label="Author"
              outlined
              dense
              required
            ></v-text-field>

            <v-text-field 
              type="date" 
              :rules="dateRules"
              v-model="editingArticle.date" 
              label="Date" 
              outlined 
              dense 
              required
            ></v-text-field>

            <v-btn color="primary" @click="saveEditedArticle">Save Changes</v-btn>
            <v-btn color="secondary" @click="cancelEdit" class="ml-2">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useAttrs } from 'vue'
import { useBlogArticleStore } from '@/stores/blog';
import { VForm } from 'vuetify/components';

const titleRules = [
  (v: string) => !!v || 'Title is required',
  (v: string) => (v && v.length <= 100) || 'Title must be less than 100 characters',
];

const textRules = [
  (v: string) => !!v || 'Text is required',
];

const authorRules = [
  (v: string) => !!v || 'Author is required',
  (v: string) => (v && v.length <= 50) || 'Author must be less than 50 characters',
];

const dateRules = [
  (v: string) => (!!v || v == typeof undefined) || 'Date is required',
];

const form = ref<VForm | null>(null); 
const validForm = ref(true);
const attrs = useAttrs()
const articleStore = useBlogArticleStore();

const actionHide = attrs["actionHide"] as Function;

const editingArticle = ref(JSON.parse(JSON.stringify(attrs["article"] ?? "{}")) as BlogArticle);

const saveEditedArticle = async () => {
  const { valid } = await form.value?.validate() ?? {valid:false}; 
  validForm.value = valid;

  if(!valid)
    return;

  if (editingArticle.value) {
    articleStore.updateArticle(editingArticle.value);
  }

  if(actionHide) actionHide();
};

const cancelEdit = () => {
  if(actionHide) actionHide();
};
</script>