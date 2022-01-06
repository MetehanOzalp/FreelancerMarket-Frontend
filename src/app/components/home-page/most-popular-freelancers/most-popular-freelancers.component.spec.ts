import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularFreelancersComponent } from './most-popular-freelancers.component';

describe('MostPopularFreelancersComponent', () => {
  let component: MostPopularFreelancersComponent;
  let fixture: ComponentFixture<MostPopularFreelancersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularFreelancersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
