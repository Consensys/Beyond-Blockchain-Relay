import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HomePageComponent} from './home-page.component';
import {of} from 'rxjs';
import {configureTestSuite} from 'ng-bullet';
import {LoadingPlaceholderComponent} from '../../shared/components/loading-placeholder/loading-placeholder.component';
import {MockComponent} from 'ng-mocks';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        MockComponent(LoadingPlaceholderComponent),
        HomePageComponent
      ]

    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;

  });

  it('should create component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialice heroes', async(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('app-hero-card')).length).toBe(1);
    });
  }));
});
