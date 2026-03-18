import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopForm } from './workshop-form';

describe('WorkshopForm', () => {
  let component: WorkshopForm;
  let fixture: ComponentFixture<WorkshopForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopForm],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
