import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPagePostFeedComponent } from './search-page-post-feed.component';

describe('SearchPagePostFeedComponent', () => {
  let component: SearchPagePostFeedComponent;
  let fixture: ComponentFixture<SearchPagePostFeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPagePostFeedComponent]
    });
    fixture = TestBed.createComponent(SearchPagePostFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
