import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingBoxComponent } from './sorting-box.component';

describe('SortingBoxComponent', () => {
  let component: SortingBoxComponent;
  let fixture: ComponentFixture<SortingBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingBoxComponent]
    });
    fixture = TestBed.createComponent(SortingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
