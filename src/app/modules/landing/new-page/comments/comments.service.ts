import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class CommentsService {
    private url = 'http://localhost:3000';
    private _subcomment: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );
    private _idsubcoment: BehaviorSubject<any | null> = new BehaviorSubject(
        null
    );

    constructor(private http: HttpClient) {}
    get subcomments$(): Observable<any[]> {
        return this._subcomment.asObservable();
    }
    get idsubcomments$(): Observable<any> {
        return this._idsubcoment.asObservable();
    }

    GetSubcomment() {
        return this.http.get<any[]>(this.url + `/subcomment`).pipe(
            tap((coments) => {
                this._subcomment.next(coments);
            })
        );
    }
    getIdSubcoment() {
        return this.http.get<any>(this.url + `/idsubcomment`).pipe(
            tap((coments) => {
                this._idsubcoment.next(coments);
            })
        );
    }
    postSubcomment(data) {
        return this.subcomments$.pipe(
            take(1),
            switchMap((comments) =>
                this.http.post(this.url + `/subcomment`, data).pipe(
                    map((comment) => {
                        this._subcomment.next([comment, ...comments]);

                        return comment;
                    })
                )
            )
        );
    }
    postIdSubcomment(data) {
      return this.idsubcomments$.pipe(
          take(1),
          switchMap((comments) =>
              this.http.post(this.url + `/idsubcomment`, data).pipe(
                  map((comment) => {
                      this._idsubcoment.next([...comments, comment]);

                      return comment;
                  })
              )
          )
      );
  }
}
