import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Article } from '../../core/models/article';
import { ArticleService } from '../../core/services/article/article.service';
import { ArticleCardComponent } from "../article-card/article-card.component";
import { UserLocalService } from '../../core/services/userLocal/user-local.service';
import { AuthLoginResponse } from '../../core/models/auth';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ArticleCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    articles!:Article[]
    isConnected: boolean = false;
    name!: string | undefined;
    email!: string | undefined;
    token!: string;
    user!: AuthLoginResponse | null;
    constructor(private articleService: ArticleService,private userlocalService : UserLocalService){}
  
    ngOnInit(){
      this.userConnected()
      this.getArticles()
    }
  
    getArticles(){
      this.articleService.getArticle().subscribe({
        next:(res)=>{
          console.log("les article recuperé",this.articles=res.data)
          this.articles = res.data
        },
        error:(err)=>{
          console.error("Une erreur", err)
        }
      })
    }

userConnected(): boolean {
  const user = this.userlocalService.getUser();
  console.log("utilisateur connecté",user)
  return !!user?.token; // Renvoie true si le token existe, sinon false
}


}
