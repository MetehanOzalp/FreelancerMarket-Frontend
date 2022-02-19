import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerPanelComponent } from './freelancer-panel.component';

describe('FreelancerPanelComponent', () => {
  let component: FreelancerPanelComponent;
  let fixture: ComponentFixture<FreelancerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
