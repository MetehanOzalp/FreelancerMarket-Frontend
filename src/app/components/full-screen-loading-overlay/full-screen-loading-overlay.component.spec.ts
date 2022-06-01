import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenLoadingOverlayComponent } from './full-screen-loading-overlay.component';

describe('FullScreenLoadingOverlayComponent', () => {
  let component: FullScreenLoadingOverlayComponent;
  let fixture: ComponentFixture<FullScreenLoadingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullScreenLoadingOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenLoadingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
