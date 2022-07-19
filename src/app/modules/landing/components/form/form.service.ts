import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FormService {
  private urlApi = environment.url
    private _customers: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );
    get customers$(): Observable<any[]> {
        return this._customers.asObservable();
    }
    constructor(private _httpClient: HttpClient) {}

    postForm(data): Observable<any> {
        return this.customers$.pipe(
            take(1),
            switchMap((customer) =>
                this._httpClient
                    .post<any>(`${this.urlApi}/ticket`, data)
                    .pipe(
                        map((result) => {
                            console.log(result);

                            const newNhanvien = result;
                            // this._nhanviens.next([
                            //     newNhanvien,
                            //     ...nhanviens,
                            // ]);
                            return newNhanvien;
                        })
                    )
            )
        );
    }
}
