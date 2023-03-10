import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { EditTerminosYCondicionesComponent } from './components/edit-terminos-y-condiciones/edit-terminos-y-condiciones.component';
import { NewTerminosYCondicionesComponent } from './components/new-terminos-y-condiciones/new-terminos-y-condiciones.component';
import { TerminosYCondicionesDialogDialogComponent } from './components/terminos-y-condiciones-dialog/terminos-y-condiciones-dialog.component';
import { TerminosYCondicionesFormComponent } from './components/terminos-y-condiciones-form/terminos-y-condiciones-form.component';
import { TerminosYCondicionesTableComponent } from './components/terminos-y-condiciones-table/terminos-y-condiciones-table.component';
import { TerminosYCondicionesRoutingModule } from './terminos-y-condiciones-routing.module';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatBottomSheetModule,
		MatButtonModule,
		MatCardModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatSelectModule,
		MatSortModule,
		MatTableModule,
		MatToolbarModule,
		MatTooltipModule,
		TerminosYCondicionesRoutingModule,
		MatCheckboxModule,
		MatMenuModule,
	],
	declarations: [
		TerminosYCondicionesFormComponent,
		TerminosYCondicionesTableComponent,
		TerminosYCondicionesDialogDialogComponent,
		NewTerminosYCondicionesComponent,
		EditTerminosYCondicionesComponent,
	],
	exports: [
		TerminosYCondicionesFormComponent,
		TerminosYCondicionesTableComponent,
		TerminosYCondicionesDialogDialogComponent,
		NewTerminosYCondicionesComponent,
		EditTerminosYCondicionesComponent,
	],
})
export class TerminosYCondicionesModule {}
