import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorWorkshops } from './colaborador-workshops';

describe('ColaboradorWorkshops', () => {
  let component: ColaboradorWorkshops;
  let fixture: ComponentFixture<ColaboradorWorkshops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboradorWorkshops],
    }).compileComponents();

    fixture = TestBed.createComponent(ColaboradorWorkshops);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
