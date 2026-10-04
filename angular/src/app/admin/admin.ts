import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoticiasService, Noticia } from '../services/noticias.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {

  noticias: Noticia[] = [];

  editando = false;
  mostrarFormulario = false;

  noticiaActual: Noticia = this.nuevaNoticia();

  constructor(private noticiasService: NoticiasService) {
    this.cargarNoticias();
  }


  // Crear objeto vacío para una nueva noticia
  nuevaNoticia(): Noticia {
    return {
      id: 0,
      categoria: '',
      titulo: '',
      fecha: '',
      imagen: '',
      descripcion: '',
      contenido: ''
    };
  }


  // Cargar noticias desde el servicio
  cargarNoticias(): void {
    this.noticias = this.noticiasService.obtenerNoticias();
  }


  // Abrir formulario para crear
  abrirFormulario(): void {
    this.editando = false;
    this.noticiaActual = this.nuevaNoticia();
    this.mostrarFormulario = true;
  }


  // Editar noticia
  editarNoticia(noticia: Noticia): void {
    this.editando = true;
    this.noticiaActual = { ...noticia };
    this.mostrarFormulario = true;
  }


  // Cancelar formulario
  cancelar(): void {
    this.mostrarFormulario = false;
    this.noticiaActual = this.nuevaNoticia();
    this.editando = false;
  }


  // Seleccionar imagen desde el computador
  seleccionarImagen(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const archivo = input.files[0];

    if (!archivo.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida.');
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      this.noticiaActual.imagen = lector.result as string;
    };

    lector.readAsDataURL(archivo);
  }


  // Guardar noticia
  guardarNoticia(): void {

    if (
      !this.noticiaActual.titulo.trim() ||
      !this.noticiaActual.categoria ||
      !this.noticiaActual.fecha ||
      !this.noticiaActual.imagen.trim() ||
      !this.noticiaActual.descripcion.trim() ||
      !this.noticiaActual.contenido.trim()
    ) {
      alert('Completa todos los campos.');
      return;
    }


    // Si estamos editando
    if (this.editando) {

      this.noticiasService.actualizarNoticia({
        ...this.noticiaActual
      });

    }

    // Si estamos creando
    else {

      const { id, ...datosNuevaNoticia } = this.noticiaActual;

      this.noticiasService.crearNoticia(
        datosNuevaNoticia
      );

    }


    // Actualizar lista
    this.cargarNoticias();

    // Cerrar formulario
    this.mostrarFormulario = false;

    this.noticiaActual = this.nuevaNoticia();

    this.editando = false;
  }


  // Eliminar noticia
  eliminarNoticia(id: number): void {

    const noticia = this.noticias.find(
      item => item.id === id
    );

    if (!noticia) {
      return;
    }


    const confirmar = confirm(
      `¿Seguro que deseas eliminar la noticia "${noticia.titulo}"?`
    );


    if (!confirmar) {
      return;
    }


    this.noticiasService.eliminarNoticia(id);

    this.cargarNoticias();
  }

}