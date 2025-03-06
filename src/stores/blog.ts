// src/stores/blog.ts
import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'
import { BlogServiceKey } from "@/symbols";
import type { IBlogService } from "@/interfaces/IBlogService";

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

  export const useBlogArticleStore = defineStore(BLOG_STORE_KEY, async () => {
    // State
    const blogArticles = ref<BlogArticle[]>([]);
    const dataService = inject("hello") as IBlogService;

    // Initialize the store by fetching articles
    const initialize = async () => {
      blogArticles.value = await dataService.getArticles();
    };
  
    // Actions
    const addArticle = (article: BlogArticle) => {
      const newArticle = { ...article, id: generateUuidV4() };
      dataService.addArticle(newArticle);
      blogArticles.value.push(newArticle); // Update local state
    };
  
    const getArticle = async (id: string | undefined): Promise<BlogArticle | undefined> => {
      return await dataService.getArticle(id);
    };
  
    const getArticles  = async () : Promise<BlogArticle[]> => {
      const da = await dataService.getArticles();
      console.log("DA",da)
      return da;
    } 
  
    const updateArticle = (updatedArticle: BlogArticle) => {
      const index = blogArticles.value.findIndex((article) => article.id === updatedArticle.id);
      if (index !== -1) {
        blogArticles.value[index] = updatedArticle;
        dataService.updateArticle(updatedArticle); // Assuming dataService has an update method
      }
    };
  
    const deleteArticle = async (article: BlogArticle | undefined = { title: '', id: '', author: '', date: undefined, text: '' }) => {
      const appStore = useAppStore();
      const result = (await appStore.showDialog('ConfirmDialog', {
        title: 'Deleting blog article',
        text: `Do you really want to delete the blog article with name "${article.title}"?`,
        persistent: true,
        dialogWidth: 400,
      })) as boolean;
  
      if (result) {
        await dataService.deleteArticle(article);
        blogArticles.value = blogArticles.value.filter((a) => a.id !== article.id); // Update local state
      }
    };
  
    // Getters
    const getArticleById = computed(() => (id: string) => {
      return blogArticles.value.find((article) => article.id === id);
    });
  
    // Initialize the store when it's created
    await initialize();
  
    return {
      blogArticles,
      addArticle,
      getArticle,
      getArticles,
      updateArticle,
      deleteArticle,
      getArticleById,
    };
  });

useBlogArticleStore().$subscribe(async (mutation, state) => {
    // persist the whole state to the local storage whenever it changes
    console.log(state)
    // dataService.blogArticles = (await state)
})