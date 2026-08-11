import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { OverviewComponent } from './features/dashboard/overview/overview.component';
import { ResumeBuilderComponent } from './features/resume-builder/resume-builder.component';
import { ResumeAnalyzerComponent } from './features/resume-analyzer/resume-analyzer.component';
import { MyResumesComponent } from './features/my-resumes/my-resumes.component';
import { JobsComponent } from './features/jobs/jobs.component';
import { ProfileComponent } from './features/profile/profile.component';
import { RecruiterDashboardComponent } from './features/recruiter/dashboard/recruiter-dashboard.component';
import { RecruiterJobsComponent } from './features/recruiter/jobs/recruiter-jobs.component';
import { CandidateSearchComponent } from './features/recruiter/candidates/candidate-search.component';
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component';
import { UsersManagementComponent } from './features/admin/users/users-management.component';
import { AnalyticsComponent } from './features/admin/analytics/analytics.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'resume-builder', component: ResumeBuilderComponent },
      { path: 'resume-builder/:id', component: ResumeBuilderComponent },
      { path: 'analyzer', component: ResumeAnalyzerComponent },
      { path: 'my-resumes', component: MyResumesComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'profile', component: ProfileComponent },
      // Recruiter routes
      { path: 'recruiter/dashboard', component: RecruiterDashboardComponent, canActivate: [roleGuard], data: { roles: ['RECRUITER', 'ADMIN'] } },
      { path: 'recruiter/jobs', component: RecruiterJobsComponent, canActivate: [roleGuard], data: { roles: ['RECRUITER', 'ADMIN'] } },
      { path: 'recruiter/candidates', component: CandidateSearchComponent, canActivate: [roleGuard], data: { roles: ['RECRUITER', 'ADMIN'] } },
      // Admin routes
      { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [roleGuard], data: { roles: ['ADMIN'] } },
      { path: 'admin/users', component: UsersManagementComponent, canActivate: [roleGuard], data: { roles: ['ADMIN'] } },
      { path: 'admin/analytics', component: AnalyticsComponent, canActivate: [roleGuard], data: { roles: ['ADMIN'] } },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '' },
];
