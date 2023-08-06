import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBoxFullComponent } from './post-box-full.component';

describe('PostBoxFullComponent', () => {
  let component: PostBoxFullComponent;
  let fixture: ComponentFixture<PostBoxFullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostBoxFullComponent]
    });
    fixture = TestBed.createComponent(PostBoxFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
