import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AiService {
  constructor(private http: HttpClient) {}

  improveContent(sectionType: string, originalContent: string, context?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/ai/improve-content`, { sectionType, originalContent, ...context });
  }

  analyzeResume(resumeText: string, jobDescription?: string): Observable<any> {
    return this.http.post(`${environment.aiServiceUrl}/analyze/ats-score`, { resume_text: resumeText, job_description: jobDescription });
  }

  uploadAndAnalyze(file: File, jobDescription?: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    if (jobDescription) formData.append('job_description', jobDescription);
    return this.http.post(`${environment.aiServiceUrl}/analyze/upload`, formData);
  }

  matchJobDescription(resumeText: string, jobDescription: string): Observable<any> {
    return this.http.post(`${environment.aiServiceUrl}/match/job-description`, { resume_text: resumeText, job_description: jobDescription });
  }

  recommendSkills(currentSkills: string[], targetRole: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/ai/recommend-skills`, { currentSkills, targetRole });
  }
}
