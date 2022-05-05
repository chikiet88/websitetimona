import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Khoahoc } from './khoahoc.types';
import { KHOAHOC } from './mock-khoahoc';
@Injectable({
  providedIn: 'root'
})
export class KhoahocService {
  private urlApi = 'https://v2api.timona.edu.vn/baiviet'
  private _course: BehaviorSubject<any | null> = new BehaviorSubject(null);
  // _course$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _courses: BehaviorSubject<Khoahoc[] | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient,) { }
  
  get courses$(): Observable<Khoahoc[]>{
    return this._courses.asObservable();
  }
  get course$(): Observable<Khoahoc[]>{
    return this._course.asObservable();
  }

  

  getKhoahoc(): Observable<Khoahoc[]>{
    return this.http.get<Khoahoc[]>(this.urlApi).pipe(
      tap((courses) => {
          this._courses.next(courses);
      })
  );

  }
  getKhoahocChitiet(slug: string): Observable<Khoahoc>
    {
      return this.http.get<Khoahoc>(`https://v2api.timona.edu.vn/baiviet/slug/${slug}`).pipe(
        map((course) => {

            // Update the course
            this._course.next(course);
            
            
            // Return the course
            return course;

        }),
        switchMap((course) => {

            if ( !course )
            {
                return throwError('Could not found course with id of ' + slug + '!');
            }

            return of(course);
        })
    );
    }
  
}
