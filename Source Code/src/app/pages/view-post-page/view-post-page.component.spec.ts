import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostPageComponent } from './view-post-page.component';

describe('ViewPostPageComponent', () => {
  let component: ViewPostPageComponent;
  let fixture: ComponentFixture<ViewPostPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPostPageComponent]
    });
    fixture = TestBed.createComponent(ViewPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
