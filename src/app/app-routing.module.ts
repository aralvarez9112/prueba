import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoGeneradoComponent } from './components/producto-generado/producto-generado.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoNuevoComponent } from './components/producto-nuevo/producto-nuevo.component';
import { ProductosBorradorComponent } from './components/productos-borrador/productos-borrador.component';
import { AdministradorGuard } from './components/guards/administrador.guard';
import { EmpresasComponent } from './components/admin/empresas/empresas.component';
import { TerminosYCondicionesPageComponent } from './components/terminos-y-condiciones-page/terminos-y-condiciones-page.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "pagina/inicio", component: InicioComponent },
  { path: "pagina/admin/terminosycondiciones", component: TerminosYCondicionesPageComponent, canActivate: [AdministradorGuard]},
  { path: "pagina/admin/empresas", component: EmpresasComponent,canActivate: [AdministradorGuard]},
  { path: "pagina/producto-nuevo", component: ProductoNuevoComponent },
  { path: "pagina/producto-nuevo/:id", component: ProductoNuevoComponent },
  { path: "pagina/producto-generado", component: ProductoGeneradoComponent },
  { path: "pagina/productos", component: ProductosComponent },
  { path: "pagina/productos-borrador", component: ProductosBorradorComponent },
  { path: "pagina/actividades", component: ActividadesComponent },
  { path: "pagina/carga-masiva", component: ProductosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
