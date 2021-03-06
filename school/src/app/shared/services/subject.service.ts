import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

import {Observable} from "rxjs";
import {Subject} from "../models/subject.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  api = '/api/fullstack/subject';

  constructor(private http: HttpClient) {

  }

  getSubjects() {
    return this.http
      .get<Subject[]>(`${this.api}/allResolved`)
      .pipe(catchError(this.handleError));
  }


  getSubjectsFiltered(filter: string,
                            sortField: string,
                            sortDirection: string,
                            pageIndex: string,
                            pageSize: string) {

    return this.http
      .get<Subject[]>(`${this.api}/filtered`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortField', sortField)
          .set('sortOrder', sortDirection)
          .set('pageIndex', pageIndex)
          .set('pageSize', pageSize),
        headers: new HttpHeaders()
          .set('Cache-Control', 'no-cache')
      })
      .pipe(
         catchError(this.handleError)
      );
  }


  countSubjects(filter: string): Observable<number> {
    return this.http
      .get<number>(`${this.api}/count`, {
        params: new HttpParams()
          .set('filter', filter),
        headers: new HttpHeaders()
          .set('Cache-Control', 'no-cache')
      })
      .pipe(
         catchError(this.handleError)
      );
  }

  createSubject(subject: Subject) {
    return this.http
      .post(`${this.api}/create`, subject)
      .pipe(catchError(this.handleError));
  }

  deleteSubject(id: number) {
    return this.http
      .delete(`${this.api}/delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSubject(subject: Subject) {
    return this.http
      .put(`${this.api}/update/${subject.id}`, subject)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      alert(`Error: ${error.status},  ${error.statusText}`);
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
