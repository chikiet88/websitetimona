import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LetotnghiepService {
    // private urlApi = 'https://v2api.timona.edu.vn/danhmuc';
    private urlApi = 'http://localhost:3000/letotnghiep';

    post: any;
    private _letotnghieps: BehaviorSubject<any | null> = new BehaviorSubject(
        null
    );

    constructor(private http: HttpClient) {}

    get letotnghieps$(): Observable<any> {
        return this._letotnghieps.asObservable();
    }
    //   get danhmuc$(): Observable<any> {
    //     return this._danhmuc.asObservable();
    // }
    // get theme$(): Observable<any>{
    //   return this._themes.asObservable();
    // }

    AddHinhLetotnghiep(data) {
        return this.letotnghieps$.pipe(
            take(1),
            switchMap((letotnghieps) =>
                this.http.post(this.urlApi, data).pipe(
                    map((letotnghiep) => {
                        this._letotnghieps.next([letotnghiep, ...letotnghieps]);

                        return letotnghiep;
                    })
                )
            )
        );
    }

    getHinhLetotnghiep() {
        return this.http.get(this.urlApi).pipe(
            map((letotnghieps) => {
                this._letotnghieps.next(letotnghieps);

                return letotnghieps;
            })
        );
    }
    deleteHinhLetotnghiep(id) {
        return this.letotnghieps$.pipe(
            take(1),
            switchMap((letotnghieps) =>
                this.http.delete(this.urlApi + `/${id}`).pipe(
                    map((isDelete) => {
                        const updateHinh = letotnghieps.filter(
                            (e) => e.id != id
                        );

                        this._letotnghieps.next(updateHinh);
                        return isDelete;
                    })
                )
            )
        );
    }

    updateHinhLetotnghiep(data) {
        return this.letotnghieps$.pipe(
            take(1),
            switchMap((letotnghieps) =>
                this.http.patch(this.urlApi + `/${data.id}`, data).pipe(
                    map((updateHinh) => {
                        // Find the index of the updated tag
                        const index = letotnghieps.findIndex(
                            (item) => item.id === item.id
                        );

                        // Update the tag
                        letotnghieps[index] = data;

                        // Update the tags
                        this._letotnghieps.next(letotnghieps);

                        // Return the updated tag
                        return updateHinh;
                    })
                )
            )
        );
    }
}
