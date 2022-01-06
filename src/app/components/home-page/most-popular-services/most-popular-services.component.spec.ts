import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularServicesComponent } from './most-popular-services.component';

describe('MostPopularServicesComponent', () => {
  let component: MostPopularServicesComponent;
  let fixture: ComponentFixture<MostPopularServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPopularServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
