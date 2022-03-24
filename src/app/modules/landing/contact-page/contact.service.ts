import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Khoahoc } from './contact-types';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private urlApi = 'https://localhost:3000/theme';
  private _courses: BehaviorSubject<Khoahoc[] | null> = new BehaviorSubject(
    null
  );
  private _course: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);


  constructor(private http: HttpClient) {}
  get courses$(): Observable<Khoahoc[]> {
    return this._courses.asObservable();
  }
 
  get course$(): Observable<Khoahoc[]> {
    return this._course.asObservable();
  }
  getKhoahoc() {
    return this.http.get<Khoahoc[]>(this.urlApi).pipe(
      tap((courses) => {
        this._courses.next(courses);
      })
    );
  }
  
  
 

  


}
