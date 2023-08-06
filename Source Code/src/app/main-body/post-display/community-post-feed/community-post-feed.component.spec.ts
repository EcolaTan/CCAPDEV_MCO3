import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPostFeedComponent } from './community-post-feed.component';

describe('CommunityPostFeedComponent', () => {
  let component: CommunityPostFeedComponent;
  let fixture: ComponentFixture<CommunityPostFeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityPostFeedComponent]
    });
    fixture = TestBed.createComponent(CommunityPostFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
