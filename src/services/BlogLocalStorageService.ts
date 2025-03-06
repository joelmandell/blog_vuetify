import type { IBlogService } from "@/interfaces/IBlogService"

const BLOG_STORE_KEY='blogArticles'

export class BlogLocalStorageService implements IBlogService {

    public get blogArticles(): BlogArticle[] {
        return JSON.parse(localStorage.getItem(BLOG_STORE_KEY) ?? "[]") as BlogArticle[]
    }

    set blogArticles(articles: BlogArticle[]) {
        localStorage.setItem(BLOG_STORE_KEY, JSON.stringify(articles))
    }

    addArticle(article: BlogArticle): boolean {
        try {
            this.blogArticles.push(article);
            return true;
        } catch {

        }

        return false;
    }
    async getArticles(): Promise<BlogArticle[]> {
        console.log(this.blogArticles)
        return await this.blogArticles;
    }
    async getArticle(id: string | undefined): Promise<BlogArticle|undefined> {
        return this.blogArticles.find((blog) => blog.id === id)
    }
    async deleteArticle(article: BlogArticle): Promise<boolean> {
        try {
            this.blogArticles = this.blogArticles.filter((blog) => blog.id != article.id);
        } catch {
            
        }
        return false
    }
    updateArticle(article: BlogArticle): boolean {
        throw new Error("Method not implemented.");
    }
}