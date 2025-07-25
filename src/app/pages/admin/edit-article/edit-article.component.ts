import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../core/services/article/article.service';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css'
})
export class EditArticleComponent {
  articleForm!: FormGroup;
  articleId!: number;
  showToast = false;
  toastType: 'success' | 'error' = 'success';
  toastMessage = '';
  isSubmited: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  private router = inject(Router);
  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

      //on charge les donnees de l'annonce
    loadArticleData(): void {
      this.articleService.getArticleById(this.articleId).subscribe({
        next: (article) => {
          console.log("données chargé", article)
          this.articleForm.patchValue(article);
        },
        error: () => {
          this.errorMessage = "Erreur lors du chargement de l'article";
        },
      });
    }

    ngOnInit() {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      content: ['', Validators.required]
    })
    this.articleId = +this.route.snapshot.paramMap.get('id')!
    this.loadArticleData()

  }
      
  // Soumission du formulaire
  onSubmit() {
    this.isSubmited = true; // Indique que le formulaire a été soumis
    this.errorMessage = '';
    this.successMessage = '';
    // Vérifie la validité du formulaire
    if (this.articleForm.invalid) {
      //on active le toast avec message d'erreur
      this.showToast = true;
      this.isSubmited = false;
      this.toastType = 'error';
      this.toastMessage = 'Veuillez remplir correctement le formulaire';
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
      return;
    }
    const formData = new FormData();
    const formValues = this.articleForm.value;
      for (const key in formValues) {
      if (formValues[key] !== null && formValues[key] !== undefined) {
        formData.append(key, formValues[key]);
      }
    }
 
    // Envoie des données au backend via le service
    this.articleService.updateArticle(this.articleId,this.articleForm.value).subscribe({
      next: () => {
        console.log(this.articleForm.value)
        // Si succès : affiche message, reset formulaire et fichiers
        this.successMessage = 'Article mis à jour  avec success !';
        this.isSubmited = false;
        this.showToast = true;
        this.toastType = 'success';
        this.toastMessage = 'Article mis à jour  avec success';
        setTimeout(() => {
          this.showToast = false;
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (err) => {
        // Si erreur : message d’erreur
        console.error("erreur",err)
        this.errorMessage = err.error.message || 'Une erreur est survenue.';
        this.isSubmited = false;
        this.toastType = 'error';
        this.toastMessage = 'Une erreur est survenue.';
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      },
    });
  }


}
