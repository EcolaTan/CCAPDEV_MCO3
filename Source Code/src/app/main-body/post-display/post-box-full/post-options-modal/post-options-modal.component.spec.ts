import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOptionsModalComponent } from './post-options-modal.component';

describe('PostOptionsModalComponent', () => {
  let component: PostOptionsModalComponent;
  let fixture: ComponentFixture<PostOptionsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostOptionsModalComponent]
    });
    fixture = TestBed.createComponent(PostOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
