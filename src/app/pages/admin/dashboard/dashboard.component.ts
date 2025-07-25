import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../core/models/article';
import { ArticleService } from '../../../core/services/article/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    articles!:Article[]
    articleId: number = -1;
    isModalOpen = false;
    isDeleteModalOpen = false;
    constructor(private articleService: ArticleService){}
        ngOnInit(){
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

    openDeleteModal(id:number) {
    this.isDeleteModalOpen = true;
     this.articleId = id;
  }

    closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  confirmDelete() {
    this.deleteArticle();
    this.closeDeleteModal();
  } 

  deleteArticle(){
    this.articleService.deleteArticle(this.articleId).subscribe({
    next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.error('Erreur suppression article', err);
      },
    })
  }
}
