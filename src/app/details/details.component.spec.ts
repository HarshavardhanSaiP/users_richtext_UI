import { TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ApiServiceService } from '../api-service.service';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiServiceService>;

  beforeEach(async () => {
    // Mock ActivatedRoute with a snapshot paramMap
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => '123', // Mock 'id' parameter
        },
      },
    };

    // Mock history.state with fake user data
    Object.defineProperty(window, 'history', {
      value: {
        state: {
          data: { firstName: 'Test', lastName: 'User', hairPojo: { color: 'Brown' } },
        },
      },
    });

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    apiServiceSpy = jasmine.createSpyObj('ApiServiceService', ['getCachedUsers']);

    await TestBed.configureTestingModule({
      imports: [DetailsComponent], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ApiServiceService,
          useValue: apiServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the id from ActivatedRoute', () => {
    component.ngOnInit();
    expect(component.id).toEqual('123'); // Check if the correct 'id' is retrieved
  });

  it('should retrieve user data from history.state', () => {
    component.ngOnInit();
    expect(component.user).toEqual({ firstName: 'Test', lastName: 'User', hairPojo: { color: 'Brown' } }); // Validate user data
  });

  it('should render the details-form-bg container', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.details-form-bg'));
    expect(container).toBeTruthy();
  });

  it('should render the user name in the details-title', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.details-title'));
    expect(title.nativeElement.textContent).toContain('Test User');
  });

  it('should render at least one details-form-section', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const sections = fixture.debugElement.queryAll(By.css('.details-form-section'));
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should render at least one form-row', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('.form-row'));
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should render the back button', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const backBtn = fixture.debugElement.query(By.css('.back-btn'));
    expect(backBtn).toBeTruthy();
  });

  it('should navigate to /list-users with full list if cached users length > 1', () => {
    apiServiceSpy.getCachedUsers.and.returnValue([{}, {}]);
    component.user = { id: 1 };
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/list-users']);
  });

  it('should navigate to /list-users with single user if cached users length <= 1', () => {
    apiServiceSpy.getCachedUsers.and.returnValue([{}]);
    component.user = { id: 1 };
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/list-users'], { state: { data: [component.user] } });
  });
});
