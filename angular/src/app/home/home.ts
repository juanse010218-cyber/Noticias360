import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../services/noticias.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  noticias: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.noticias = this.noticiasService.obtenerNoticias();
  }

  get noticiasDestacadas(): Noticia[] {
    return this.noticias.slice(0, 3);
  }

}