import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingSectionComponent } from './lighting-section.component';

describe('LightingSectionComponent', () => {
  let component: LightingSectionComponent;
  let fixture: ComponentFixture<LightingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightingSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
