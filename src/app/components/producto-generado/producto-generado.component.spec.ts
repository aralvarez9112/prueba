import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoGeneradoComponent } from './producto-generado.component';

describe('FinishedProductComponent', () => {
  let component: ProductoGeneradoComponent;
  let fixture: ComponentFixture<ProductoGeneradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoGeneradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoGeneradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
