import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoticiasService, Noticia } from '../services/noticias.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css'
})
export class NoticiasComponent {

  noticias: Noticia[] = [];

  favoritos: number[] = this.cargarFavoritos();

  busqueda: string = '';

  categoriaSeleccionada: string = 'Todas';


  constructor(private noticiasService: NoticiasService) {
    this.cargarNoticias();
  }


  cargarNoticias(): void {
    this.noticias = this.noticiasService.obtenerNoticias();
  }


  get noticiasFiltradas(): Noticia[] {

    return this.noticias.filter(noticia => {

      const coincideBusqueda =
        noticia.titulo
          .toLowerCase()
          .includes(this.busqueda.toLowerCase()) ||

        noticia.descripcion
          .toLowerCase()
          .includes(this.busqueda.toLowerCase());


      const coincideCategoria =
        this.categoriaSeleccionada === 'Todas' ||
        noticia.categoria === this.categoriaSeleccionada;


      return coincideBusqueda && coincideCategoria;

    });

  }


  filtrarPorCategoria(categoria: string): void {

    this.categoriaSeleccionada = categoria;

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


  alternarFavorito(id: number): void {

    if (this.favoritos.includes(id)) {

      this.favoritos =
        this.favoritos.filter(
          favoritoId => favoritoId !== id
        );

    } else {

      this.favoritos = [
        ...this.favoritos,
        id
      ];

    }


    localStorage.setItem(
      'favoritosAngular',
      JSON.stringify(this.favoritos)
    );

  }


  esFavorito(id: number): boolean {

    return this.favoritos.includes(id);

  }

}