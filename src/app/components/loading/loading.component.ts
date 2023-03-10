import { Component,Input } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  loading$ = this.loader.loading$;
  @Input() show: boolean;
  constructor(
    private loader:LoadingService) { }
}
