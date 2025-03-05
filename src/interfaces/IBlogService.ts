export interface IBlogService {
    addArticle(article: BlogArticle) : boolean;
    getArticles() : Promise<BlogArticle[]>;
    getArticle(id: string) : Promise<BlogArticle|undefined>;
    deleteArticle(article: BlogArticle) : Promise<boolean>;
    updateArticle(article: BlogArticle) : boolean;
}