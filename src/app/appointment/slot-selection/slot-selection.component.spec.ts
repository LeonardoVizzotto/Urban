import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotSelectionComponent } from './slot-selection.component';

describe('SlotSelectionComponent', () => {
  let component: SlotSelectionComponent;
  let fixture: ComponentFixture<SlotSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
