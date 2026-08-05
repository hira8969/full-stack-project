import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ResumeService } from '../../core/services/resume.service';
import { AiService } from '../../core/services/ai.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule,
    MatChipsModule, MatTooltipModule, MatProgressSpinnerModule],
  templateUrl: './resume-builder.component.html',
})
export class ResumeBuilderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  resumeId: number | null = null;
  form: FormGroup;
  saving = false;
  generatingPdf = false;
  improvingField: string | null = null;
  activeSection = 'personal';
  selectedTemplate = 'MODERN_ATS';

  templates = [
    { id: 'MODERN_ATS', name: 'Modern ATS', color: '#3b82f6', icon: 'auto_awesome' },
    { id: 'GOOGLE', name: 'Google', color: '#4285F4', icon: 'description' },
    { id: 'FAANG', name: 'FAANG', color: '#FF6B00', icon: 'rocket_launch' },
    { id: 'HARVARD', name: 'Harvard', color: '#A31F34', icon: 'school' },
    { id: 'MIT', name: 'MIT', color: '#750014', icon: 'science' },
    { id: 'MINIMAL_ATS', name: 'Minimal ATS', color: '#8b5cf6', icon: 'design_services' },
    { id: 'SOFTWARE_ENGINEER', name: 'Software Eng.', color: '#06b6d4', icon: 'code' },
    { id: 'DATA_SCIENTIST', name: 'Data Scientist', color: '#10b981', icon: 'analytics' },
    { id: 'JAVA_DEVELOPER', name: 'Java Developer', color: '#f59e0b', icon: 'terminal' },
  ];

  sections = [
    { id: 'personal', label: 'Personal Info', icon: 'person' },
    { id: 'summary', label: 'Summary', icon: 'subject' },
    { id: 'experience', label: 'Experience', icon: 'work' },
    { id: 'education', label: 'Education', icon: 'school' },
    { id: 'skills', label: 'Skills', icon: 'code' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
    { id: 'certificates', label: 'Certificates', icon: 'workspace_premium' },
    { id: 'achievements', label: 'Achievements', icon: 'emoji_events' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private aiService: AiService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      title: ['My Resume', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: [''],
      linkedinUrl: [''],
      githubUrl: [''],
      portfolioUrl: [''],
      professionalSummary: [''],
      experience: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([]),
      projects: this.fb.array([]),
      certificates: this.fb.array([]),
      achievements: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.resumeId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.resumeId) this.loadResume();

    // Prefill with current user data
    const user = this.authService.getCurrentUser();
    if (user && !this.resumeId) {
      this.form.patchValue({ fullName: user.fullName, email: user.email });
    }
  }

  loadResume() {
    this.resumeService.getResume(this.resumeId!).subscribe({
      next: (resume: any) => {
        const data = resume.resumeData || {};
        this.selectedTemplate = resume.templateType || 'MODERN_ATS';
        this.form.patchValue({
          title: resume.title,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          location: data.location,
          linkedinUrl: data.linkedinUrl,
          githubUrl: data.githubUrl,
          portfolioUrl: data.portfolioUrl,
          professionalSummary: data.professionalSummary,
        });
        (data.experience || []).forEach((e: any) => this.addExperience(e));
        (data.education || []).forEach((e: any) => this.addEducation(e));
        (data.skills || []).forEach((s: any) => this.addSkill(s));
        (data.projects || []).forEach((p: any) => this.addProject(p));
        (data.achievements || []).forEach((a: string) => this.addAchievement(a));
      },
      error: () => this.toastr.error('Failed to load resume')
    });
  }

  get experience() { return this.form.get('experience') as FormArray; }
  get education() { return this.form.get('education') as FormArray; }
  get skills() { return this.form.get('skills') as FormArray; }
  get projects() { return this.form.get('projects') as FormArray; }
  get certificates() { return this.form.get('certificates') as FormArray; }
  get achievements() { return this.form.get('achievements') as FormArray; }

  addExperience(data?: any) {
    this.experience.push(this.fb.group({
      companyName: [data?.companyName || ''],
      jobTitle: [data?.jobTitle || ''],
      location: [data?.location || ''],
      startDate: [data?.startDate || ''],
      endDate: [data?.endDate || ''],
      isCurrent: [data?.isCurrent || false],
      description: [data?.description || ''],
    }));
  }

  addEducation(data?: any) {
    this.education.push(this.fb.group({
      institution: [data?.institution || ''],
      degree: [data?.degree || ''],
      fieldOfStudy: [data?.fieldOfStudy || ''],
      startDate: [data?.startDate || ''],
      endDate: [data?.endDate || ''],
      gpa: [data?.gpa || ''],
      isCurrent: [data?.isCurrent || false],
    }));
  }

  addSkill(data?: any) {
    this.skills.push(this.fb.group({
      skillName: [data?.skillName || ''],
      category: [data?.category || 'TECHNICAL'],
      proficiencyLevel: [data?.proficiencyLevel || 'INTERMEDIATE'],
    }));
  }

  addProject(data?: any) {
    this.projects.push(this.fb.group({
      projectName: [data?.projectName || ''],
      description: [data?.description || ''],
      technologies: [data?.technologies || ''],
      githubUrl: [data?.githubUrl || ''],
      projectUrl: [data?.projectUrl || ''],
    }));
  }

  addAchievement(value = '') {
    this.achievements.push(this.fb.control(value));
  }

  removeItem(array: FormArray, index: number) { array.removeAt(index); }

  improveWithAi(field: string) {
    const content = this.form.get(field)?.value;
    if (!content) { this.toastr.info('Add some content first to improve'); return; }
    this.improvingField = field;
    this.aiService.improveContent(field, content).subscribe({
      next: (res: any) => {
        const improved = res?.data?.improvedContent || res?.improvedContent || content;
        this.form.get(field)?.setValue(improved);
        this.toastr.success('Content improved by AI!');
        this.improvingField = null;
      },
      error: () => {
        this.toastr.error('AI improvement failed. Please try again.');
        this.improvingField = null;
      }
    });
  }

  saveDraft() {
    if (this.form.get('title')?.invalid) { this.toastr.error('Please enter a resume title'); return; }
    this.saving = true;
    const payload = {
      title: this.form.value.title,
      templateType: this.selectedTemplate,
      resumeData: this.getResumeData(),
      status: 'DRAFT'
    };
    const req$ = this.resumeId
      ? this.resumeService.updateResume(this.resumeId, payload)
      : this.resumeService.createResume(payload);

    req$.subscribe({
      next: (res: any) => {
        this.resumeId = res.id || this.resumeId;
        this.toastr.success('Draft saved!');
        this.saving = false;
      },
      error: () => { this.toastr.error('Save failed'); this.saving = false; }
    });
  }

  generatePdf() {
    if (!this.resumeId) { this.saveDraft(); return; }
    this.generatingPdf = true;
    this.resumeService.generatePdf(this.resumeId, this.selectedTemplate, this.getResumeData()).subscribe({
      next: (res: any) => {
        const url = res?.data?.downloadUrl || res?.downloadUrl;
        if (url) window.open(url, '_blank');
        this.toastr.success('PDF generated!');
        this.generatingPdf = false;
      },
      error: () => { this.toastr.error('PDF generation failed'); this.generatingPdf = false; }
    });
  }

  getResumeData() {
    const v = this.form.value;
    return {
      fullName: v.fullName, email: v.email, phone: v.phone,
      location: v.location, linkedinUrl: v.linkedinUrl,
      githubUrl: v.githubUrl, portfolioUrl: v.portfolioUrl,
      professionalSummary: v.professionalSummary,
      experience: v.experience, education: v.education,
      skills: v.skills, projects: v.projects,
      achievements: v.achievements,
    };
  }

  get previewData() { return this.getResumeData(); }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}
