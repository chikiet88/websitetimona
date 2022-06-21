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

@Injectable({
    providedIn: 'root',
})
export class LetotnghiepService {
    private urlApi = 'https://v2api.timona.edu.vn/baiviet';
    // private urlApi = 'http://localhost:3000/letotnghiep';

    private _imageLetotnghiep: BehaviorSubject<any | null> =
        new BehaviorSubject(null);
    private _imageDetail: BehaviorSubject<any | null> = new BehaviorSubject(
        null
    );
    // _course$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) {}

    get imageLetotnghiep$(): Observable<any[]> {
        return this._imageLetotnghiep.asObservable();
    }
    get imageDetail$(): Observable<any[]> {
        return this._imageDetail.asObservable();
    }

    getDataLetotnghiep(): Observable<any[]> {
        return this.http.get<any[]>(this.urlApi).pipe(
            tap((data) => {
                this._imageLetotnghiep.next(data);
            })
        );
    }
    getDataDetail(slug): Observable<any> {
        return (
            this.http
                // .get<any>(this.urlApi + `/${id}`)
                .get<any>(this.urlApi+`/slug/${slug}`)

                .pipe(
                    map((data) => {
                        // Update the course
                        this._imageDetail.next(data);

                        // Return the course
                        return data;
                    }),
                    switchMap((data) => {
                        if (!data) {
                            return throwError(
                                'Could not found course with id of ' + slug + '!'
                            );
                        }

                        return of(data);
                    })
                )
        );
    }
}
