import { Component } from '@angular/core';
import { AuthLoginResponse } from '../../core/models/auth';
import { UserLocalService } from '../../core/services/userLocal/user-local.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    isConnected!: boolean;
    name!: string | undefined;
    email!: string | undefined;
    token!: string;
    user!: AuthLoginResponse | null;
    constructor(private userlocalService : UserLocalService,private router: Router){}

redirectToLogin() {
  this.router.navigate(['/login']);
}
  
    ngOnInit(){

    }
  userConnected(): boolean {
  const user = this.userlocalService.getUser();
  console.log("utilisateur connecté", user);
  return !!user?.token;
}
}
