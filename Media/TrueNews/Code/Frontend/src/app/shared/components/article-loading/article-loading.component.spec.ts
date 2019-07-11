import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLoadingComponent } from './article-loading.component';

describe('ArticleLoadingComponent', () => {
  let component: ArticleLoadingComponent;
  let fixture: ComponentFixture<ArticleLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
