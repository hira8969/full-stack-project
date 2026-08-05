import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

interface NavItem { label: string; icon: string; route: string; }

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive,
    MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule],
  templateUrl: './dashboard-layout.component.html',
  styles: [`
    .nav-item { color: rgba(255,255,255,0.45); transition: all 0.2s; }
    .nav-item:hover { background: rgba(59,130,246,0.1); color: rgba(255,255,255,0.9); }
    .active-nav { background: rgba(59,130,246,0.15) !important; color: #3b82f6 !important; }
  `]
})
export class DashboardLayoutComponent implements OnInit {
  currentUser: User | null = null;
  sidebarCollapsed = false;

  candidateNav: NavItem[] = [
    { label: 'Overview', icon: 'dashboard', route: '/dashboard/overview' },
    { label: 'Resume Builder', icon: 'edit_document', route: '/dashboard/resume-builder' },
    { label: 'My Resumes', icon: 'description', route: '/dashboard/my-resumes' },
    { label: 'ATS Analyzer', icon: 'analytics', route: '/dashboard/analyzer' },
    { label: 'Browse Jobs', icon: 'work', route: '/dashboard/jobs' },
    { label: 'My Profile', icon: 'person', route: '/dashboard/profile' },
  ];

  recruiterNav: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard/recruiter/dashboard' },
    { label: 'My Jobs', icon: 'work', route: '/dashboard/recruiter/jobs' },
    { label: 'Find Candidates', icon: 'person_search', route: '/dashboard/recruiter/candidates' },
    { label: 'My Profile', icon: 'person', route: '/dashboard/profile' },
  ];

  adminNav: NavItem[] = [
    { label: 'Admin Dashboard', icon: 'admin_panel_settings', route: '/dashboard/admin/dashboard' },
    { label: 'Manage Users', icon: 'group', route: '/dashboard/admin/users' },
    { label: 'Analytics', icon: 'bar_chart', route: '/dashboard/admin/analytics' },
    { label: 'My Profile', icon: 'person', route: '/dashboard/profile' },
  ];

  get navItems(): NavItem[] {
    if (this.currentUser?.role === 'ADMIN') return this.adminNav;
    if (this.currentUser?.role === 'RECRUITER') return this.recruiterNav;
    return this.candidateNav;
  }

  get roleColor(): string {
    const c: any = { ADMIN: '#ef4444', RECRUITER: '#f59e0b', CANDIDATE: '#10b981' };
    return c[this.currentUser?.role || 'CANDIDATE'];
  }

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(u => this.currentUser = u);
  }

  logout() { this.authService.logout(); }
  toggleSidebar() { this.sidebarCollapsed = !this.sidebarCollapsed; }
  getInitial(): string { return (this.currentUser?.fullName?.charAt(0) || 'U').toUpperCase(); }
}
