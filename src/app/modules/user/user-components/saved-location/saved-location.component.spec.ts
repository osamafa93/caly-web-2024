import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLocationComponent } from './saved-location.component';

describe('SavedLocationComponent', () => {
  let component: SavedLocationComponent;
  let fixture: ComponentFixture<SavedLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
