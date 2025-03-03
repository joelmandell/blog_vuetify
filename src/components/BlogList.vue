<template>
 <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">Blog Articles</v-card-title>
          <v-card-text>
                <template v-if="ListArticles">
                    <BlogArticleComponent :key="item.id" v-for="item in model" :article="item">
                    </BlogArticleComponent>
                </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { useSlots, onBeforeMount, onUpdated, onMounted,defineProps} from 'vue'
import BlogArticleComponent from '@/components/BlogArticle'
const {ListArticles} = defineProps(["ListArticles"])

const model = defineModel()

</script>