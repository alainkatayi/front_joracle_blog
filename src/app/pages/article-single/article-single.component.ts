import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Article } from '../../core/models/article';
import { ArticleService } from '../../core/services/article/article.service';
import { UserLocalService } from '../../core/services/userLocal/user-local.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-single',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './article-single.component.html',
  styleUrl: './article-single.component.css'
})
export class ArticleSingleComponent {
      articles!:Article
      isConnected: boolean = false;
      articleId!: number;

      
      constructor(private articleService: ArticleService,private userlocalService : UserLocalService,private route: ActivatedRoute,){}
      ngOnInit() {
        this.userConnected();
        this.articleId = +this.route.snapshot.paramMap.get('id')!;
        this.getArticle();
      }
      getArticle(){
        this.articleService.getArticleById(this.articleId).subscribe({
          next:(res)=>{
            console.log("les article recuperé",this.articles=res)
            this.articles = res
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
