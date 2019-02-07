import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTakingToolbarComponent } from './note-taking-toolbar.component';

describe('NoteTakingToolbarComponent', () => {
  let component: NoteTakingToolbarComponent;
  let fixture: ComponentFixture<NoteTakingToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteTakingToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTakingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
