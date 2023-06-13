import { Component } from '@angular/core';

interface Article {
  id?: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  articles: Article[] = [];
  article: Article = { title: '', content: '' };

  saveArticle() {
    // Add new article or update existing article
    if (this.article.id) {
      const index = this.articles.findIndex(a => a.id === this.article.id);
      if (index >= 0) {
        this.articles[index] = { ...this.article };
      }
    } else {
      const newArticle = { ...this.article, id: Date.now() };
      this.articles.push(newArticle);
    }

    this.article = { title: '', content: '' };
  }

  editArticle(article: Article) {
    // Set the current article for editing
    this.article = { ...article };
  }

  deleteArticle(article: Article) {
    // Delete the article
    const index = this.articles.findIndex(a => a.id === article.id);
    if (index >= 0) {
      this.articles.splice(index, 1);
    }
  }
}
