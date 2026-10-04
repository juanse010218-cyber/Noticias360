import { Injectable } from '@angular/core';

export interface Noticia {
  id: number;
  categoria: string;
  titulo: string;
  fecha: string;
  imagen: string;
  descripcion: string;
  contenido: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private readonly claveStorage = 'noticiasAdmin';

  private noticiasIniciales: Noticia[] = [
    {
      id: 1,
      categoria: 'Tecnología',
      titulo: 'La inteligencia artificial está transformando el futuro',
      fecha: '2026-01-15',
      imagen: 'ia.JPG',
      descripcion: 'La inteligencia artificial está cambiando la forma en que trabajamos, aprendemos y vivimos.',
      contenido: 'La inteligencia artificial continúa evolucionando y generando nuevas oportunidades en diferentes sectores.'
    },
    {
      id: 2,
      categoria: 'Turismo',
      titulo: 'Los 5 destinos imperdibles de Colombia',
      fecha: '2026-01-20',
      imagen: 'turismo.JPG',
      descripcion: 'Colombia cuenta con destinos increíbles para disfrutar de la naturaleza y la cultura.',
      contenido: 'Desde las playas del Caribe hasta las montañas y ciudades históricas, Colombia ofrece diferentes opciones para los viajeros.'
    },
    {
      id: 3,
      categoria: 'Educación',
      titulo: 'La educación digital abre nuevas oportunidades',
      fecha: '2026-01-25',
      imagen: 'educacion.JPG',
      descripcion: 'Las nuevas tecnologías permiten acceder a diferentes alternativas de aprendizaje.',
      contenido: 'La educación digital facilita el acceso al conocimiento y permite desarrollar nuevas habilidades desde cualquier lugar.'
    },
    {
      id: 4,
      categoria: 'Negocios',
      titulo: 'Nuevas tendencias para los negocios',
      fecha: '2026-01-30',
      imagen: 'negocios.jpg',
      descripcion: 'Las empresas están adoptando nuevas estrategias para responder a los cambios del mercado.',
      contenido: 'La transformación digital y las nuevas formas de trabajo están modificando la manera en que las empresas desarrollan sus actividades.'
    }
  ];

  obtenerNoticias(): Noticia[] {
    const guardadas = localStorage.getItem(this.claveStorage);

    if (guardadas) {
      try {
        return JSON.parse(guardadas);
      } catch {
        return [...this.noticiasIniciales];
      }
    }

    localStorage.setItem(
      this.claveStorage,
      JSON.stringify(this.noticiasIniciales)
    );

    return [...this.noticiasIniciales];
  }

  guardarNoticias(noticias: Noticia[]): void {
    localStorage.setItem(
      this.claveStorage,
      JSON.stringify(noticias)
    );
  }

  obtenerPorId(id: number): Noticia | undefined {
    return this.obtenerNoticias().find(
      noticia => noticia.id === id
    );
  }

  crearNoticia(noticia: Omit<Noticia, 'id'>): Noticia {

    const noticias = this.obtenerNoticias();

    const nuevoId = noticias.length > 0
      ? Math.max(...noticias.map(n => n.id)) + 1
      : 1;

    const nuevaNoticia: Noticia = {
      id: nuevoId,
      ...noticia
    };

    noticias.push(nuevaNoticia);

    this.guardarNoticias(noticias);

    return nuevaNoticia;
  }

  actualizarNoticia(noticiaActualizada: Noticia): void {

    const noticias = this.obtenerNoticias();

    const indice = noticias.findIndex(
      noticia => noticia.id === noticiaActualizada.id
    );

    if (indice !== -1) {
      noticias[indice] = noticiaActualizada;
      this.guardarNoticias(noticias);
    }
  }

  eliminarNoticia(id: number): void {

    const noticias = this.obtenerNoticias().filter(
      noticia => noticia.id !== id
    );

    this.guardarNoticias(noticias);
  }
}