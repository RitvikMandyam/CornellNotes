import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTileComponent } from './note-tile.component';

describe('NoteTileComponent', () => {
  let component: NoteTileComponent;
  let fixture: ComponentFixture<NoteTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
