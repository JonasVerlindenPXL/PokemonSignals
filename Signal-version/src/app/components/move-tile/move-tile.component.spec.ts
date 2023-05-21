import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveTileComponent } from './move-tile.component';

describe('MoveTileComponent', () => {
  let component: MoveTileComponent;
  let fixture: ComponentFixture<MoveTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveTileComponent]
    });
    fixture = TestBed.createComponent(MoveTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
