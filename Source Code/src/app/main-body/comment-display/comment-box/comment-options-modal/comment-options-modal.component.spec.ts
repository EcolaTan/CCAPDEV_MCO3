import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentOptionsModalComponent } from './comment-options-modal.component';

describe('CommentOptionsModalComponent', () => {
  let component: CommentOptionsModalComponent;
  let fixture: ComponentFixture<CommentOptionsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentOptionsModalComponent]
    });
    fixture = TestBed.createComponent(CommentOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
