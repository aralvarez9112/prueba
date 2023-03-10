import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Angular Mat
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSidenavModule} from '@angular/material/sidenav';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AppConfig } from './app.config';
//Components
import { AppComponent } from './app.component';
import { ProductoGeneradoComponent } from './components/producto-generado/producto-generado.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductoNuevoComponent } from './components/producto-nuevo/producto-nuevo.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProductoComponent } from './components/producto/producto.component';
import { EmpaqueComponent } from './components/empaque/empaque.component';
import { ProductosBorradorComponent } from './components/productos-borrador/productos-borrador.component';

//Modals
import { ModalSuccessComponent } from './components/modals/modal-success/modal-success.component';
import { ModalEliminarComponent } from './components/modals/modal-eliminar/modal-eliminar.component';
import { ModalAltaEmpaqueComponent } from './components/modals/modal-alta-empaque/modal-alta-empaque.component';
import { ModalEliminarBorradorComponent } from './components/modals/modal-eliminar-borrador/modal-eliminar.component';
import { ModalInfoProductoComponent } from './components/modals/modal-info/modal-info.component';
import { ModalSeleccionCodigoComponent } from './components/modals/modal-seleccion-codigo/modal-seleccion-codigo.component';
import { ModalAltaSiguienteComponent } from './components/modals/modal-alta-siguiente/modal-alta-siguiente.component';
import { ModalOperacionesMasivasComponent } from './components/modals/modal-operaciones-masivas/modal-operaciones-masivas.component';
import { ModalSeleccionEmpresaComponent } from './components/modals/modal-seleccion-empresa/modal-seleccion-empresa.component';
import { EmpresasComponent } from './components/admin/empresas/empresas.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

//Services
import { EmpresaService } from './services/empresa.service';
import { UtilService } from './services/util.service';
import { LoadingService } from './services/loading.service';
import { ToastService } from './services/toastr.service';
import { AuthenticationService } from './services/authentication.service';

import { CodigoPipe } from './pipes/codigo.pipe';
import { VacioPipe } from './pipes/vacio.pipe';
import { PaisPipe } from './pipes/pais.pipe';
import { ContenidoNetoPipe } from './pipes/contenidoNeto.pipe';


import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { HttpHeadersInterceptorService } from './services/interceptors/http-headers-interceptor.service';
import { TerminosYCondicionesModule } from './components/terminos-y-condiciones/terminos-y-condiciones.module';
import { TerminosYCondicionesPageComponent } from './components/terminos-y-condiciones-page/terminos-y-condiciones-page.component';
import { MatCardModule } from '@angular/material/card';

export function AppConfigFactory(providerAppConfig: AppConfig) {
  return () => providerAppConfig.loadConfig();
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'MM',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    TerminosYCondicionesModule,
  ],
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    FooterComponent,
    InicioComponent,
    EmpresasComponent,
    ProductoNuevoComponent,
    ProductoGeneradoComponent,
    ProductosComponent,
    ProductoComponent,
    EmpaqueComponent,
    ProductosBorradorComponent,
    ActividadComponent,
    ActividadesComponent,
    TabNavigationComponent,
    CustomToastComponent,
    ModalSuccessComponent,
    ModalEliminarComponent,
    ModalEliminarBorradorComponent,
    ModalAltaEmpaqueComponent,
    ModalInfoProductoComponent,
    ModalSeleccionCodigoComponent,
    ModalAltaSiguienteComponent,
    ModalOperacionesMasivasComponent,
    ModalSeleccionEmpresaComponent,
    LoadingComponent,
    LoginDialogComponent,
    TerminosYCondicionesPageComponent,
    VacioPipe,
    CodigoPipe,
    PaisPipe,
    ContenidoNetoPipe
  ],

  providers: [EmpresaService, UtilService, ToastService, LoadingService, AuthenticationService,
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: AppConfigFactory, deps: [AppConfig], multi: true },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptorService,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
