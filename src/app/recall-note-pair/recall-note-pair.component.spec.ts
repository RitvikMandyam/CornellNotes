import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecallNotePairComponent } from './recall-note-pair.component';

describe('RecallNotePairComponent', () => {
  let component: RecallNotePairComponent;
  let fixture: ComponentFixture<RecallNotePairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecallNotePairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecallNotePairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
