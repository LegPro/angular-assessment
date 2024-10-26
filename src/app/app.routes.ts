import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { OfficerComponent } from './officer/officer.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

function redirectBasedOnAuth() {
  const authService = inject(AuthService);
  return authService.isAuthenticated() ? 'home' : '/';
}

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'detail', component: DetailComponent, canActivate: [AuthGuard] },
  { path: 'officer', component: OfficerComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { 
    path: 'redirect', 
    redirectTo: () => redirectBasedOnAuth()
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
