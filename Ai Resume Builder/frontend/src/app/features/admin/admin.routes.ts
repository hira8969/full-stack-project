import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { UsersManagementComponent } from './users/users-management.component';
import { AnalyticsComponent } from './analytics/analytics.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'users', component: UsersManagementComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
