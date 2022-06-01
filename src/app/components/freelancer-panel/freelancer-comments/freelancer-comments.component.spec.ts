import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerCommentsComponent } from './freelancer-comments.component';

describe('FreelancerCommentsComponent', () => {
  let component: FreelancerCommentsComponent;
  let fixture: ComponentFixture<FreelancerCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
