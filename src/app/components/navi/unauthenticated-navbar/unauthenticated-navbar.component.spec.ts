import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedNavbarComponent } from './unauthenticated-navbar.component';

describe('UnauthenticatedNavbarComponent', () => {
  let component: UnauthenticatedNavbarComponent;
  let fixture: ComponentFixture<UnauthenticatedNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenticatedNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
