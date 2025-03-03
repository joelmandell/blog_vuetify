<template>

<v-row>
    <v-col cols="12" md="12" offset-md="0">
        <v-list>
            <v-list-item>
            <v-card class="mb-4" elevation="2">
                <v-card-title>{{ article.title }}</v-card-title>
                <v-card-subtitle>
                By {{ article.author }} on {{ formatDate(article.date) }}
                </v-card-subtitle>
                <v-card-text>
                {{ article.content }}
                </v-card-text>
            </v-card>
            </v-list-item>
        </v-list>
    </v-col>
</v-row>
<v-row>
    <v-col>
        <v-btn color="success" @click="editArticle">Edit</v-btn>
    </v-col>
</v-row>
</template>
<script setup lang="ts">
import { ref, defineProps, defineModel, useAttrs } from 'vue';
import { useAppStore } from '@/stores/app';
import { useBlogArticleStore } from '@/stores/blog';
import type { BlogArticle } from '@/types'; // Import types
const newArticle = ref<Omit<BlogArticle, 'id'>>({
  title: '',
  text: '',
  author: '',
  date: new Date()
});

const appStore = useAppStore();
const articleStore = useBlogArticleStore();

const {article} = defineProps(["article"])
const editingArticle = ref<Article | null>(null);

const editArticle = () => {
    appStore.showDialog("BlogEdit",{article})
}

const deleteArticle = (id: Uuid) => {
  articleStore.deleteArticle(id);
};

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString(); // Format date for display
};
</script>