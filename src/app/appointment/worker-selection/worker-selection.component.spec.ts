import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { mockProviders } from 'src/app/test/utils';

import { WorkerSelectionComponent } from './worker-selection.component';

describe('WorkerSelectionComponent', () => {
  let component: WorkerSelectionComponent;
  let fixture: ComponentFixture<WorkerSelectionComponent>;
  const { providers } = mockProviders();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [WorkerSelectionComponent],
      providers,
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
