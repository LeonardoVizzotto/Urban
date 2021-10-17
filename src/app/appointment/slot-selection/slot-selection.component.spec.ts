import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { mockProviders } from 'src/app/test/utils';

import { SlotSelectionComponent } from './slot-selection.component';

describe('SlotSelectionComponent', () => {
  let component: SlotSelectionComponent;
  let fixture: ComponentFixture<SlotSelectionComponent>;
  const { providers } = mockProviders();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [SlotSelectionComponent],
      providers,
    }).compileComponents();
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
