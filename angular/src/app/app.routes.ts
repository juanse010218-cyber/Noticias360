import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin';
import { HomeComponent } from './home/home';

export const routes: Routes = [

  {
    path: 'noticias',
    loadComponent: () =>
      import('./noticias/noticias')
        .then(m => m.NoticiasComponent)
  },

  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./detalle/detalle')
        .then(m => m.DetalleComponent)
  },

  {
    path: 'favoritos',
    loadComponent: () =>
      import('./favoritos/favoritos')
        .then(m => m.FavoritosComponent)
  },

  {
    path: 'contacto',
    loadComponent: () =>
      import('./contacto/contacto')
        .then(m => m.ContactoComponent)
  },

  {
  path: 'admin',
  component: AdminComponent
},

{
  path: '',
  component: HomeComponent
}

];