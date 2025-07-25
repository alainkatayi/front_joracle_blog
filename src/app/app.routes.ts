import { ArticleListComponent } from './pages/article-list/article-list.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CreateArticleComponent } from './pages/admin/create-article/create-article.component';
import { EditArticleComponent } from './pages/admin/edit-article/edit-article.component';
import { ArticleSingleComponent } from './pages/article-single/article-single.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:'create',
        component:CreateArticleComponent
    },
    {
        path:'edit/:id',
        component:EditArticleComponent
    }
    ,
    {
        path:'list',
        component:ArticleListComponent
    },
    {
        path:'article-single/:id',
        component:ArticleSingleComponent
    }
    ,
    {
        path:'about',
        component:AboutComponent
    }
];
