import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AiService } from '../../core/services/ai.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resume-analyzer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatProgressBarModule],
  templateUrl: './resume-analyzer.component.html',
})
export class ResumeAnalyzerComponent {
  selectedFile: File | null = null;
  isDragging = false;
  analyzing = false;
  result: any = null;
  jdForm: FormGroup;

  scoreCategories = [
    { key: 'overallScore', label: 'Overall ATS', icon: 'analytics', color: '#3b82f6' },
    { key: 'keywordScore', label: 'Keywords', icon: 'text_fields', color: '#8b5cf6' },
    { key: 'formattingScore', label: 'Formatting', icon: 'article', color: '#06b6d4' },
    { key: 'experienceScore', label: 'Experience', icon: 'work', color: '#10b981' },
    { key: 'skillsScore', label: 'Skills', icon: 'code', color: '#f59e0b' },
    { key: 'grammarScore', label: 'Grammar', icon: 'spellcheck', color: '#ef4444' },
  ];

  constructor(private fb: FormBuilder, private aiService: AiService, private toastr: ToastrService) {
    this.jdForm = this.fb.group({ jobDescription: [''] });
  }

  onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging = true; }
  onDragLeave() { this.isDragging = false; }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
    const file = e.dataTransfer?.files[0];
    if (file) this.setFile(file);
  }

  onFileSelected(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.setFile(file);
  }

  setFile(file: File) {
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      this.toastr.error('Please upload a PDF or DOCX file');
      return;
    }
    this.selectedFile = file;
    this.result = null;
  }

  analyze() {
    if (!this.selectedFile) { this.toastr.info('Please select a resume file first'); return; }
    this.analyzing = true;
    const jd = this.jdForm.value.jobDescription;
    this.aiService.uploadAndAnalyze(this.selectedFile, jd || undefined).subscribe({
      next: (res: any) => {
        this.result = res.data || res;
        this.analyzing = false;
        this.toastr.success('Analysis complete!');
      },
      error: () => {
        // Show demo result on error for testing
        this.result = this.getDemoResult();
        this.analyzing = false;
        this.toastr.info('Using demo analysis (AI service not connected)');
      }
    });
  }

  getScoreColor(score: number): string {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  }

  getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  }

  getDemoResult() {
    return {
      overallScore: 72,
      keywordScore: 68,
      formattingScore: 85,
      experienceScore: 70,
      skillsScore: 75,
      grammarScore: 90,
      matchingKeywords: ['Java', 'Spring Boot', 'Microservices', 'REST API', 'Docker', 'MySQL', 'Git'],
      missingKeywords: ['Kubernetes', 'AWS', 'CI/CD', 'Kafka', 'Redis'],
      actionVerbsFound: ['Developed', 'Implemented', 'Designed', 'Led', 'Optimized'],
      suggestions: [
        'Add more quantifiable achievements (e.g., "Improved performance by 40%")',
        'Include cloud technologies like AWS or Azure',
        'Add Kubernetes experience to match market demand',
        'Use stronger action verbs like "Architected" or "Spearheaded"',
        'Increase keyword density for ATS optimization',
      ]
    };
  }

  clearFile() { this.selectedFile = null; this.result = null; }
}
