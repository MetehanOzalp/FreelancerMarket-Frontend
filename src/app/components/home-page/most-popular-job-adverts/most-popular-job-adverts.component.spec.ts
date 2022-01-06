import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularJobAdvertsComponent } from './most-popular-job-adverts.component';

describe('MostPopularJobAdvertsComponent', () => {
  let component: MostPopularJobAdvertsComponent;
  let fixture: ComponentFixture<MostPopularJobAdvertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularJobAdvertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularJobAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
