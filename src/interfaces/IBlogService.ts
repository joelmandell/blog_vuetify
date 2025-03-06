export interface IBlogService {
    blogArticles : BlogArticle[];
    addArticle(article: BlogArticle) : boolean;
    getArticles() : Promise<BlogArticle[]>;
    getArticle(id: string | undefined) : Promise<BlogArticle|undefined>;
    deleteArticle(article: BlogArticle) : Promise<boolean>;
    updateArticle(article: BlogArticle) : boolean;
}