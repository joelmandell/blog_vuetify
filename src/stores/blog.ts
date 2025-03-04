// src/stores/blog.ts
import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'

const BLOG_STORE_KEY='blogArticles'

function generateUuidV4(): string {
    // Generate a random hexadecimal string of the required length
    const randomHex = (length: number): string => {
      return Array.from({ length }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('')
    }
  
    // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    // x = random hexadecimal digit
    // y = one of 8, 9, A, or B
    return (
      randomHex(8) +
      '-' +
      randomHex(4) +
      '-4' + // Version 4
      randomHex(3) +
      '-' +
      ['8', '9', 'a', 'b'][Math.floor(Math.random() * 4)] + // Variant
      randomHex(3) +
      '-' +
      randomHex(12)
    )
  }

export const useBlogArticleStore = defineStore(BLOG_STORE_KEY, {
  state: () => ({
    blogArticles: JSON.parse(localStorage.getItem(BLOG_STORE_KEY) ?? "[]") as BlogArticle[],
  }),

  actions: {
    addArticle(article : BlogArticle) {
      this.blogArticles.push({ ...article, id: generateUuidV4() })
    },

    getArticle(id:string | undefined) : BlogArticle | undefined {
      return this.blogArticles.find((item: BlogArticle) => item.id == id)
    },

    getArticles() {
      return this.blogArticles
    },

    updateArticle(updatedArticle: BlogArticle) {
      const index = this.blogArticles.findIndex(article => article.id === updatedArticle.id)
      if (index !== -1) {
        this.blogArticles[index] = updatedArticle
      }
    },

    async deleteArticle({title,id}: BlogArticle | undefined = {title:"",id:"",author:"",date:undefined, text:""}) {
      const appStore = useAppStore()
      const result = (await appStore.showDialog("../components/ConfirmDialog", 
                        { title:"Deleting blog article", 
                          text:`Do you really want to delete the blog article with name "${title}"?`, 
                          persistent:true,
                          dialogWidth:400,
                        }, true)) as boolean

      if(result) {
        this.blogArticles = this.blogArticles.filter(article => article.id !== id)
      }
    },
  },

  getters: {
    getArticleById: (state) => (id: string) => {
      return state.blogArticles.find(article => article.id === id)
    },
  },
})

useBlogArticleStore().$subscribe((mutation, state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem(BLOG_STORE_KEY, JSON.stringify(state.blogArticles))
})