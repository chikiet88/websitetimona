import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Khoahoc } from '../../sites/khoahoc/khoahoc.types';

@Injectable({
  providedIn: 'root',
})
export class MainlayoutService {
  private urlApi = 'https://v2api.timona.edu.vn/menu';
  private _courses: BehaviorSubject<Khoahoc[] | null> = new BehaviorSubject(
    null
  );
  private _course: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);


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
  getKhoahoc() {
    return this.http.get<Khoahoc[]>(this.urlApi).pipe(
      tap((courses) => {
        this._courses.next(courses);
      })
    );
  }
  getMenu(){
    return this.http.get<any>(this.urlApi).pipe(
      tap((menu) => {
        this._menu.next(menu);
        console.log(menu);
        
      })
    );
  }
  
 

  getKhoahocChitiet(id: number): Observable<Khoahoc> {
    return this.http
      .get<Khoahoc>('http://v2api.timona.edu.vn/theme/', { params: { id } })
      .pipe(
        map((course) => {
          this._course.next(course);

          return course;
        }),
        switchMap((course) => {
          if (!course) {
            return throwError('Could not found course with id of ' + id + '!');
          }

          return of(course);
        })
      );
  }
}
