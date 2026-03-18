import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopColaboradores } from './workshop-colaboradores';

describe('WorkshopColaboradores', () => {
  let component: WorkshopColaboradores;
  let fixture: ComponentFixture<WorkshopColaboradores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopColaboradores],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopColaboradores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
