import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerPanelSidebarComponent } from './freelancer-panel-sidebar.component';

describe('FreelancerPanelSidebarComponent', () => {
  let component: FreelancerPanelSidebarComponent;
  let fixture: ComponentFixture<FreelancerPanelSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerPanelSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerPanelSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
