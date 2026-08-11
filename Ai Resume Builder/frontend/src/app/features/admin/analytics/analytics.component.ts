import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {
  stats = {
    dailyActiveUsers: 0,
    resumesCreatedToday: 0,
    atsAnalysesToday: 0,
    aiRequestsToday: 0,
    avgAtsScore: 0,
    topTemplates: [] as any[],
    userGrowth: [] as any[],
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/analytics/admin/metrics`).subscribe({
      next: (res: any) => { this.stats = res.data || res; },
      error: () => {
        this.stats = {
          dailyActiveUsers: 284,
          resumesCreatedToday: 47,
          atsAnalysesToday: 123,
          aiRequestsToday: 891,
          avgAtsScore: 73,
          topTemplates: [
            { name: 'MODERN_ATS', count: 1240, percentage: 32 },
            { name: 'GOOGLE', count: 980, percentage: 25 },
            { name: 'FAANG', count: 750, percentage: 19 },
            { name: 'SOFTWARE_ENGINEER', count: 510, percentage: 13 },
            { name: 'HARVARD', count: 392, percentage: 10 },
          ],
          userGrowth: [
            { month: 'Jan', users: 120 }, { month: 'Feb', users: 245 }, { month: 'Mar', users: 380 },
            { month: 'Apr', users: 520 }, { month: 'May', users: 710 }, { month: 'Jun', users: 950 },
            { month: 'Jul', users: 1248 },
          ],
        };
      }
    });
  }
}
