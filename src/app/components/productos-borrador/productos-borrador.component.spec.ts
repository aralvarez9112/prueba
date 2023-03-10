import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosBorradorComponent } from './productos-borrador.component';

describe('ProductosBorradorComponent', () => {
  let component: ProductosBorradorComponent;
  let fixture: ComponentFixture<ProductosBorradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosBorradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosBorradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
