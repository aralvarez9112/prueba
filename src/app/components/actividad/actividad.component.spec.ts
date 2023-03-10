import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadComponent } from './actividad.component';

describe('ActivityComponent', () => {
  let component: ActividadComponent;
  let fixture: ComponentFixture<ActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
