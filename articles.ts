import Router, {RouterContext} from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { body } from 'koa-req-validation';
import * as model from '../models/articles';

const router = new Router({prefix: '/api/v1/articles'});
// const articles = [
//     {title: 'hello article', fullText: 'some text here'},
//     {title: 'another article', fullText: 'another text'},
//     {title: 'Coventry University', fullText:'some news from university'}
// ];

interface Article {
    title: string,
    fullText: string
}

const getAll = async (ctx:RouterContext, next: any) => {
    ctx.body = articles;
    await next();
}

const getById = async (ctx:RouterContext, next: any) => {
    let id = +ctx.params.id;
    if((id<=articles.length) && id>0){
        ctx.body = articles[id-1];
    } else {
        ctx.status = 404;
    }
    await next();
}
const createArticle = async (ctx:RouterContext, next: any) => {
    let article = <Article> ctx.request.body;
    let newArticle = {title: article.title, fullText: article.fullText};
    articles.push(newArticle);
    ctx.status = 201;
    ctx.body = newArticle;
    await next();
}
const updateArticle = async (ctx:RouterContext, next: any) => {
    let id = +ctx.params.id;
    let article = <Article> ctx.request.body;
    let updateArticle = {title: article.title, fullText: article.fullText};
    if((id<=articles.length) && id>0){
        articles[id-1].title = updateArticle.title;
        articles[id-1].fullText = updateArticle.fullText;
        ctx.body = {
            message: "update successfully"
        }
    } else {
        ctx.status = 404;
    }
    await next();
}
const deleteArticle = async (ctx:RouterContext, next: any) => {
    let id = +ctx.params.id;
    if((id<=articles.length) && id>0){
        articles.splice(id-1, 1);
        ctx.body = {
            message: "Article deleted"
        }
    } else {
        ctx.status = 404;
    }
    await next();
}

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.post('/', bodyParser(), createArticle);
router.put('/:id([0-9]{1,})', bodyParser(), updateArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);

export { router };
