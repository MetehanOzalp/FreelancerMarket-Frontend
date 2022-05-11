import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancersOrdersComponent } from './freelancers-orders.component';

describe('FreelancersOrdersComponent', () => {
  let component: FreelancersOrdersComponent;
  let fixture: ComponentFixture<FreelancersOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancersOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancersOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
