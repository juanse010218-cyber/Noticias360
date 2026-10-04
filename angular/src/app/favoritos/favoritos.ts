import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../services/noticias.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class FavoritosComponent {

  noticias: Noticia[] = [];

  favoritosIds: number[] = this.cargarFavoritos();


  constructor(private noticiasService: NoticiasService) {
    this.cargarNoticias();
  }


  cargarNoticias(): void {
    this.noticias = this.noticiasService.obtenerNoticias();
  }


  get noticiasFavoritas(): Noticia[] {

    return this.noticias.filter(
      noticia => this.favoritosIds.includes(noticia.id)
    );

  }


  cargarFavoritos(): number[] {

    const guardados =
      localStorage.getItem('favoritosAngular');

    if (!guardados) {
      return [];
    }


    try {

      return JSON.parse(guardados);

    } catch {

      return [];

    }

  }


  eliminarFavorito(id: number): void {

    this.favoritosIds =
      this.favoritosIds.filter(
        favoritoId => favoritoId !== id
      );


    localStorage.setItem(
      'favoritosAngular',
      JSON.stringify(this.favoritosIds)
    );

  }

}