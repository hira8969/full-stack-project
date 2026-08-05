import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './recruiter-dashboard.component.html',
})
export class RecruiterDashboardComponent implements OnInit {
  stats = { activeJobs: 0, totalApplications: 0, shortlisted: 0, interviews: 0 };
  recentJobs: any[] = [];
  recentApplications: any[] = [];
  loading = true;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.http.get(`${environment.apiUrl}/jobs/recruiter/stats`).subscribe({
      next: (res: any) => {
        this.stats = res.data || res;
        this.recentJobs = res.recentJobs || [];
        this.recentApplications = res.recentApplications || [];
        this.loading = false;
      },
      error: () => {
        // Demo data
        this.stats = { activeJobs: 5, totalApplications: 47, shortlisted: 12, interviews: 4 };
        this.recentJobs = [
          { id: 1, title: 'Senior Java Developer', applicationsCount: 18, status: 'ACTIVE', createdAt: '2026-07-20' },
          { id: 2, title: 'React Frontend Engineer', applicationsCount: 15, status: 'ACTIVE', createdAt: '2026-07-22' },
          { id: 3, title: 'DevOps Engineer', applicationsCount: 10, status: 'ACTIVE', createdAt: '2026-07-24' },
        ];
        this.loading = false;
      }
    });
  }
}
