import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Khoahoc } from './home.types';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlApi = 'https://v2api.timona.edu.vn/baiviet';
  private _courses: BehaviorSubject<Khoahoc[] | null> = new BehaviorSubject(
    null
  );
  private _course: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _cauhinh: BehaviorSubject<any | null> = new BehaviorSubject(null);


  constructor(private http: HttpClient) {}
  get courses$(): Observable<Khoahoc[]> {
    return this._courses.asObservable();
  }
  get menu$(): Observable<any> {
    return this._menu.asObservable();
  }
  get course$(): Observable<Khoahoc[]> {
    return this._course.asObservable();
  }
  get cauhinh$(): Observable<any> {
    return this._cauhinh.asObservable();
  }

  getKhoahoc() {
    return this.http.get<Khoahoc[]>(this.urlApi).pipe(
      tap((courses) => {
        this._courses.next(courses);
      })
    );
  }
  getMenu(){
    return this.http.get<any>('https://v2api.timona.edu.vn/menu').pipe(
      tap((menu) => {
        this._menu.next(menu);
        
      })
    );
  }
  
  getKhoahocChitiet(slug:string): Observable<Khoahoc> {
    return this.http
      .get<Khoahoc>(`https://v2api.timona.edu.vn/baiviet/slug/${slug}`)
      .pipe(
        map((course) => {
          this._course.next(course);
          
          return course;
        }),
        switchMap((course) => {
          if (!course) {
            return throwError('Could not found course with id of ' + slug + '!');
          }

          return of(course);
        })
      );
  }

  getCauhinh(){
    return this.http.get<any>('https://v2api.timona.edu.vn/cauhinh').pipe(
      tap((cauhinh) => {
        
        this._cauhinh.next(cauhinh);
        
      })
    );
  }
  
}
