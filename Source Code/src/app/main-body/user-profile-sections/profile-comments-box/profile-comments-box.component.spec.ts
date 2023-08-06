import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommentsBoxComponent } from './profile-comments-box.component';

describe('ProfileCommentsBoxComponent', () => {
  let component: ProfileCommentsBoxComponent;
  let fixture: ComponentFixture<ProfileCommentsBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileCommentsBoxComponent]
    });
    fixture = TestBed.createComponent(ProfileCommentsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
