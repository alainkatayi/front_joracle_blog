import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/services/article/article.service';
import { Router, RouterLink } from '@angular/router';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-article',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent {
  createArticleForm!: FormGroup;
  isSubmited: boolean = false;
  showToast = false;
  toastType: 'success' | 'error' = 'success';
  toastMessage = '';
  errorMsg=''
  successMsg=''
  private router = inject(Router);
  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder,
    private userlocalService : UserLocalService
  ) {}

    // Initialisation du composant
  ngOnInit() {
    console.log("user connected",this.userlocalService.getUser())
    // Initialisation du formulaire avec validation
    this.createArticleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      slug: ['', Validators.required], 
      photo: ['', Validators.required],
    });
  }

    selectedFile!: File;
    onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Mise à jour du champ "photo" dans le formulaire
      this.createArticleForm.patchValue({ photo: file });
      this.createArticleForm.get('photo')?.updateValueAndValidity();
    }
  }  
    // Soumission du formulaire
  onSubmit() {
    this.isSubmited = true; // Indique que le formulaire a été soumis
    this.errorMsg = '';
    this.successMsg = '';

    // Vérifie la validité du formulaire
    if (this.createArticleForm.invalid) {
      //on active le toast avec message d'erreur
      this.showToast = true;
      this.toastType = 'error';
      this.toastMessage = 'Veuillez remplir correctement le formulaire';
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    }
    const formValues = this.createArticleForm.value;
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('content', formValues.content);
    formData.append('slug', formValues.slug);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    // Envoie des données au backend via le service
    this.articleService.createArticle(formData).subscribe({
      next: (res) => {
        // Si succès : affiche message, reset formulaire et fichiers
        this.successMsg = 'Article  créée avec succès !';
        console.log("article crée", res)
        this.isSubmited = false;
        this.createArticleForm.reset();
        this.showToast = true;
        this.toastType = 'success';
        this.toastMessage = 'Article creer avec success';
        setTimeout(() => {
          this.showToast = false;
          this.router.navigate(['/']);
        }, 2000);
        console.log(res);
      },
      error: (err) => {
        // Si erreur : message d’erreur
        console.error("erreur",err)
        this.errorMsg = err.error.message || 'Une erreur est survenue.';
        this.isSubmited = false;
        this.toastType = 'error';
        this.toastMessage = 'Une erreur est survenue.';
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
          this.router.navigate(['/']);
        }, 2000);
      },
    });
  }

}
