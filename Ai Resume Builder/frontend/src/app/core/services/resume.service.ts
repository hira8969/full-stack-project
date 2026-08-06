import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Resume } from '../models/resume.model';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createResume(data: any): Observable<Resume> {
    return this.http.post<Resume>(`${this.apiUrl}/resumes`, data);
  }

  updateResume(id: number, data: any): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/resumes/${id}`, data);
  }

  getResume(id: number): Observable<Resume> {
    return this.http.get<Resume>(`${this.apiUrl}/resumes/${id}`);
  }

  getMyResumes(page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumes`, { params: { page, size } });
  }

  deleteResume(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/resumes/${id}`);
  }

  duplicateResume(id: number): Observable<Resume> {
    return this.http.post<Resume>(`${this.apiUrl}/resumes/${id}/duplicate`, {});
  }

  generatePdf(resumeId: number, templateType: string, resumeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/builder/generate`, { resumeId, templateType, resumeData, exportFormat: 'PDF' });
  }

  generateDocx(resumeId: number, templateType: string, resumeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/builder/generate/docx`, { resumeId, templateType, resumeData });
  }

  getVersionHistory(resumeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resumes/${resumeId}/versions`);
  }

  saveVersion(resumeId: number, changeDescription: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resumes/${resumeId}/versions`, { changeDescription });
  }

  restoreVersion(resumeId: number, versionNumber: number): Observable<Resume> {
    return this.http.post<Resume>(`${this.apiUrl}/resumes/${resumeId}/versions/${versionNumber}/restore`, {});
  }

  getAvailableTemplates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/builder/templates`);
  }

  updateAtsScore(resumeId: number, score: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/resumes/${resumeId}/ats-score`, { score });
  }
}
