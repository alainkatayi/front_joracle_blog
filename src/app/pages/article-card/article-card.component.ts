import { Component, Input } from '@angular/core';
import { Article } from '../../core/models/article';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-article-card',
  imports: [RouterLink, SlicePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input() article!:Article

}
