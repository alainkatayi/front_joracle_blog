import { Component } from '@angular/core';
import { Article } from '../../core/models/article';
import { AuthLoginResponse } from '../../core/models/auth';
import { ArticleService } from '../../core/services/article/article.service';
import { UserLocalService } from '../../core/services/userLocal/user-local.service';
import { ArticleCardComponent } from "../article-card/article-card.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-article-list',
  imports: [ArticleCardComponent, FooterComponent, HeaderComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent {
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
