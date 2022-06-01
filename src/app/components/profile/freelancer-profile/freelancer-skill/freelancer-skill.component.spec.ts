import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerSkillComponent } from './freelancer-skill.component';

describe('FreelancerSkillComponent', () => {
  let component: FreelancerSkillComponent;
  let fixture: ComponentFixture<FreelancerSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
