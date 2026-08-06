import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  templates = [
    { name: 'Google Resume', tag: 'Most Popular', color: '#4285F4', icon: 'description' },
    { name: 'Harvard Resume', tag: 'Academic', color: '#A31F34', icon: 'school' },
    { name: 'FAANG Resume', tag: 'Tech Giants', color: '#FF6B00', icon: 'rocket_launch' },
    { name: 'MIT Resume', tag: 'Research', color: '#750014', icon: 'science' },
    { name: 'Modern ATS', tag: 'ATS Optimized', color: '#3b82f6', icon: 'auto_awesome' },
    { name: 'Minimal ATS', tag: 'Clean Design', color: '#8b5cf6', icon: 'design_services' },
    { name: 'Software Eng.', tag: 'Developer', color: '#06b6d4', icon: 'code' },
    { name: 'Data Scientist', tag: 'AI/ML', color: '#10b981', icon: 'analytics' },
    { name: 'Java Developer', tag: 'Backend', color: '#f59e0b', icon: 'terminal' },
  ];

  features = [
    { icon: 'auto_awesome', title: 'AI Content Writer', desc: 'Transform basic descriptions into powerful, ATS-optimized content with one click', color: '#3b82f6' },
    { icon: 'analytics', title: 'ATS Score Analyzer', desc: 'Get detailed scoring across 6 dimensions: Keywords, Formatting, Experience, Skills, Projects, Grammar', color: '#8b5cf6' },
    { icon: 'preview', title: 'Live Preview', desc: 'Split-screen editor with real-time preview. See changes as you type', color: '#06b6d4' },
    { icon: 'description', title: '9 Pro Templates', desc: 'Google, Harvard, MIT, FAANG, and more. All ATS-optimized and Overleaf-quality', color: '#10b981' },
    { icon: 'compare_arrows', title: 'Version Control', desc: 'Save versions, compare changes, and restore previous versions anytime', color: '#f59e0b' },
    { icon: 'work', title: 'Job Matching', desc: 'Upload any job description to get a match score and improvement recommendations', color: '#ef4444' },
  ];

  stats = [
    { value: '50K+', label: 'Resumes Generated' },
    { value: '95%', label: 'ATS Pass Rate' },
    { value: '9', label: 'Pro Templates' },
    { value: '10x', label: 'Faster Job Search' },
  ];

  steps = [
    { num: '01', title: 'Enter Your Details', desc: 'Fill in the smart form with your experience, skills, and achievements', icon: 'edit' },
    { num: '02', title: 'AI Enhances Content', desc: 'Our AI transforms your input into compelling, ATS-optimized content', icon: 'auto_awesome' },
    { num: '03', title: 'Download Your Resume', desc: 'Get a professional PDF, DOCX, or LaTeX file instantly', icon: 'download' },
  ];
}
