import { Injectable } from '@angular/core';
import { Article } from '../../models/article';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environnement } from '../../../../environnement/environnement';
import { UserLocalService } from '../userLocal/user-local.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = environnement.apiUrl;
  constructor(private http:HttpClient, private userlocalService : UserLocalService,){}

  getArticle():Observable<{data:Article[]}>{
    return this.http.get<{data:Article[]}>(`${this.url}articles`)
  }

  createArticle(data: FormData){
    const headers = this.userlocalService.getAuthHeaders();
    console.log("auth envoyé", headers)
    return this.http.post(this.url + 'articles', data,{ headers })
  }

  deleteArticle(id:number){
    const headers = this.userlocalService.getAuthHeaders();
    return this.http.delete(`${this.url}articles/${id}`,{ headers })
  }

}
