import { Routes } from '@angular/router';
import { RecruiterDashboardComponent } from './dashboard/recruiter-dashboard.component';
import { RecruiterJobsComponent } from './jobs/recruiter-jobs.component';
import { CandidateSearchComponent } from './candidates/candidate-search.component';

export const RECRUITER_ROUTES: Routes = [
  { path: 'dashboard', component: RecruiterDashboardComponent },
  { path: 'jobs', component: RecruiterJobsComponent },
  { path: 'candidates', component: CandidateSearchComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
