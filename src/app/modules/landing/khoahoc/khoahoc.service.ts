import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    map,
    Observable,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';
import { Khoahoc } from './khoahoc.types';

@Injectable({
    providedIn: 'root',
})
export class KhoahocService {
    private urlApi = 'https://v2api.timona.edu.vn/baiviet';
    // private urlApi = 'http://localhost:3000/baiviet';

    private _course: BehaviorSubject<any | null> = new BehaviorSubject(null);
    // _course$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private _courses: BehaviorSubject<Khoahoc[] | null> = new BehaviorSubject(
        null
    );
    private _danhmucs: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {}

    get courses$(): Observable<Khoahoc[]> {
        return this._courses.asObservable();
    }
    get course$(): Observable<Khoahoc[]> {
        return this._course.asObservable();
    }
    get danhmucs$(): Observable<any[]> {
        return this._danhmucs.asObservable();
    }
    get danhmuc$(): Observable<any[]> {
        return this._danhmuc.asObservable();
    }

    getDanhmuc(): Observable<any[]> {
        return this.http.get<any[]>('https://v2api.timona.edu.vn/danhmuc').pipe(
            tap((danhmucs) => {
                this._danhmucs.next(danhmucs);
            })
        );
    }
    getDanhmucchitiet(slug): Observable<any> {
    //     let id
    //    this.danhmuc$.subscribe(res=> console.log(res))
        
    //       id = this._danhmucs.value?.find((v) => v.Slug == slug).id;

    //     Number(id)
    //     console.log(id);

        return this.http
            .get<any>(`https://v2api.timona.edu.vn/danhmuc/${19}`)
            .pipe(
                map((danhmuc) => {
                    // Update the danhmuc
                    this._danhmuc.next(danhmuc);

                    // Return the danhmuc
                    return danhmuc;
                }),
                switchMap((danhmuc) => {
                    if (!danhmuc) {
                        return throwError(
                            'Could not found danhmuc with id of ' + slug + '!'
                        );
                    }

                    return of(danhmuc);
                })
            );
    }

    getKhoahoc(): Observable<Khoahoc[]> {
        return this.http.get<Khoahoc[]>(this.urlApi).pipe(
            tap((courses) => {
                this._courses.next(courses);
            })
        );
    }
    getKhoahocChitiet(slug: string): Observable<Khoahoc> {
        return this.http
            .get<Khoahoc>(this.urlApi+`/slug/${slug}`)
            // .get<Khoahoc>(this.urlApi+`/${slug}`)

            .pipe(
                map((course) => {
                    // Update the course
                    this._course.next(course);

                    // Return the course
                    return course;
                }),
                switchMap((course) => {
                    if (!course) {
                        return throwError(
                            'Could not found course with id of ' + slug + '!'
                        );
                    }

                    return of(course);
                })
            );
    }
}
