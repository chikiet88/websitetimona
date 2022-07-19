import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostclipService {

  private urlApi = 'http://localhost:3000/clips';

  post: any;
  private _clips: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get clips$(): Observable<any> {
      return this._clips.asObservable();
  }
 
  postClip(data) {
    return this.clips$.pipe(
        take(1),
        switchMap((clips) =>
            this.http.post(this.urlApi, data).pipe(
                map((data) => {
                    this._clips.next([data, ...clips]);

                    return data;
                })
            )
        )
    );
}

  getClips() {
      return this.http.get(this.urlApi).pipe(
          map((clips) => {
              this._clips.next(clips);

              return clips;
          })
      );
  }
}
