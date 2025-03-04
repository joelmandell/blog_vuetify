<template>
<v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">Create Article</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="validForm" lazy-validation>
              <v-text-field
                v-model="newArticle.title"
                :rules="titleRules"
                label="Title"
                outlined
                dense
                required
              ></v-text-field>

              <v-textarea
                v-model="newArticle.text"
                :rules="textRules"
                label="Text"
                outlined
                dense
                required
              ></v-textarea>

              <v-text-field
                v-model="newArticle.author"
                :rules="authorRules"
                label="Author"
                outlined
                dense
                required
              ></v-text-field>

              <v-text-field 
                type="date" 
                v-model="newArticle.date" 
                :rules="dateRules"
                label="Date" 
                outlined 
                dense 
                required
              ></v-text-field>
              <v-spacer />
              <v-btn color="primary" @click="addArticle">Add Article</v-btn>
              <v-btn color="secondary" @click="actionHide()" class="ml-2">Cancel</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { useAttrs } from 'vue'
import { useBlogArticleStore } from '@/stores/blog'
import { VForm } from 'vuetify/components'

const attrs = useAttrs()
const articleStore = useBlogArticleStore()
const actionHide = attrs["actionHide"] as Function

const titleRules = [
  (v: string) => !!v || 'Title is required',
  (v: string) => (v && v.length <= 100) || 'Title must be less than 100 characters',
]

const textRules = [
  (v: string) => !!v || 'Text is required',
]

const authorRules = [
  (v: string) => !!v || 'Author is required',
  (v: string) => (v && v.length <= 50) || 'Author must be less than 50 characters',
]

const dateRules = [
  (v: string) => (!!v || v == typeof undefined) || 'Date is required',
]

const form = ref<VForm | null>(null)
const validForm = ref(true)

const newArticle = ref<BlogArticle>({
  id:'',
  title: '',
  text: '',
  author: '',
  date: undefined
})

const addArticle = async () => {
  const { valid } = await form.value?.validate() ?? {valid:false}
  validForm.value = valid
  
  if(!valid)
    return

  if (newArticle.value.title.trim() && newArticle.value.text.trim()) {
    articleStore.addArticle(newArticle.value)
  }

  if(actionHide) actionHide()
}
</script>