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

}
