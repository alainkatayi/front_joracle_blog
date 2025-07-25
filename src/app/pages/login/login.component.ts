import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthLoginData, AuthLoginResponse } from '../../core/models/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLocalService } from '../../core/services/userLocal/user-local.service';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup
  loading = false
  successMessage = ''
  errorMessage = ''


  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private route: Router,
    private routee: ActivatedRoute,
    private userLocalService : UserLocalService,
  ){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }
  onSubmit():void{
    if (this.loginForm.invalid){
      console.log("formulaire nom valide")
    };
    this.loading = true
    this.errorMessage = ''
    const data: AuthLoginData = this.loginForm.value

    this.authService.login(data).subscribe({
      next:(res) =>{
        this.userLocalService.stockerUserLocal(res);
        this.successMessage = 'Connexion réussie. Redirection en cours...';
        console.log(res)
        setTimeout(() => {
          this.successMessage = '';
          this.route.navigate(['/']);
        }, 2500);
      },
      error:(err) =>{
        this.errorMessage = err.error?.message || 'Email ou mot de passe incorrecte.';
        this.loading = false; // Arrêt de l’indicateur de chargement
        setTimeout(()=>{
          this.errorMessage = ''
        }, 2500);
        this.loading = false;
        console.error(err)
      }
    })
  }
}
