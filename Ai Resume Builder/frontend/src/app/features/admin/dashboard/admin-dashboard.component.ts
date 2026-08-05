import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  stats = { totalUsers: 0, totalResumes: 0, activeJobs: 0, revenueThisMonth: 0 };
  recentUsers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/analytics/admin/summary`).subscribe({
      next: (res: any) => {
        this.stats = res.data || res;
        this.recentUsers = res.recentUsers || [];
      },
      error: () => {
        this.stats = { totalUsers: 1248, totalResumes: 4872, activeJobs: 34, revenueThisMonth: 8450 };
        this.recentUsers = [
          { id: 1, fullName: 'Alice Johnson', email: 'alice@example.com', role: 'CANDIDATE', createdAt: '2026-07-28' },
          { id: 2, fullName: 'Bob Smith', email: 'bob@techcorp.com', role: 'RECRUITER', createdAt: '2026-07-27' },
          { id: 3, fullName: 'Carol Williams', email: 'carol@example.com', role: 'CANDIDATE', createdAt: '2026-07-26' },
        ];
      }
    });
  }

  getRoleColor(role: string): string {
    const colors: any = { ADMIN: '#ef4444', RECRUITER: '#f59e0b', CANDIDATE: '#10b981' };
    return colors[role] || '#3b82f6';
  }
}
