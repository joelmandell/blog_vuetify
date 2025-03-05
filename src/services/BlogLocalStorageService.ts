import BlogArticle from "@/components/BlogArticle.vue";
import type { IBlogService } from "@/interfaces/IBlogService"

export class BlogLocalStorageService implements IBlogService {
    private _blogArticles : BlogArticle[] = [];

    addArticle(article: BlogArticle): boolean {
        try {
            this._blogArticles.push(article);
            return true;
        } catch {

        }

        return false;
    }
    async getArticles(): Promise<BlogArticle[]> {
        return this._blogArticles;
    }
    async getArticle(id: string): Promise<BlogArticle|undefined> {
        return this._blogArticles.find((blog) => blog.id === id)
    }
    async deleteArticle(article: BlogArticle): Promise<boolean> {
        try {
            this._blogArticles = this._blogArticles.filter((blog) => blog.id != article.id);
        } catch {
            
        }
        return false
    }
    updateArticle(article: BlogArticle): boolean {
        throw new Error("Method not implemented.");
    }
}