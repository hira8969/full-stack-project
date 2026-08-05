import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../../core/services/auth.service';
import { ResumeService } from '../../../core/services/resume.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  currentUser: any;
  resumes: any[] = [];
  loading = true;
  stats = { totalResumes: 0, avgAtsScore: 0, applications: 0, aiCredits: 100 };

  quickActions = [
    { title: 'Build Resume', desc: 'Create a new AI-powered resume', icon: 'edit_document', route: '/dashboard/resume-builder', color: '#3b82f6' },
    { title: 'Analyze Resume', desc: 'Get your ATS score instantly', icon: 'analytics', route: '/dashboard/analyzer', color: '#8b5cf6' },
    { title: 'Browse Jobs', desc: 'Find matching opportunities', icon: 'work', route: '/dashboard/jobs', color: '#10b981' },
  ];

  constructor(public authService: AuthService, private resumeService: ResumeService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadData();
  }

  loadData() {
    this.resumeService.getMyResumes(0, 5).subscribe({
      next: (res: any) => {
        this.resumes = res.content || res || [];
        this.stats.totalResumes = res.totalElements || this.resumes.length;
        const scores = this.resumes.filter((r: any) => r.atsScore > 0).map((r: any) => r.atsScore);
        this.stats.avgAtsScore = scores.length ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  getScoreColor(score: number): string {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  }

  getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }
}
