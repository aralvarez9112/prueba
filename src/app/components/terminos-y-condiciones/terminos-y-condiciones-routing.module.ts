import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TerminosYCondicionesPageComponent } from '../terminos-y-condiciones-page/terminos-y-condiciones-page.component';
//
import { TerminosYCondicionesTableComponent } from './components/terminos-y-condiciones-table/terminos-y-condiciones-table.component';

const routes: Routes = [
/* 	{
		path: 'pagina/terminos-y-condiciones',
		component: TerminosYCondicionesTableComponent,
	}, */


];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TerminosYCondicionesRoutingModule {}
