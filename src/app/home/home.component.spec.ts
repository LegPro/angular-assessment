import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty initial searchTerm', () => {
    expect(component.searchTerm).toBe('');
  });

  it('should disable search button if searchTerm is empty', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should enable search button when searchTerm is populated', () => {
    component.searchTerm = 'Test Company';
    fixture.detectChanges(); // Update the view
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalse();
  });

  it('should call search method when search button is clicked', () => {
    spyOn(component, 'search');
    component.searchTerm = 'Test Company';
    fixture.detectChanges();
  
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.search).toHaveBeenCalled();
  });

});
