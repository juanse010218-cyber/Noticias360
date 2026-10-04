import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../services/noticias.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class DetalleComponent {

  noticia: Noticia | undefined;


  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService
  ) {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.noticia =
      this.noticiasService.obtenerPorId(id);

  }

}