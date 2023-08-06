import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagePostFeedComponent } from './homepage-post-feed.component';

describe('PostFeedComponent', () => {
  let component: HomepagePostFeedComponent;
  let fixture: ComponentFixture<HomepagePostFeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepagePostFeedComponent]
    });
    fixture = TestBed.createComponent(HomepagePostFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
