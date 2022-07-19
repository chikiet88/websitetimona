import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddGiangvienService {
  private urlApi = 'https://v2api.timona.edu.vn/giangvien';
//   private urlApi = 'http://localhost:3000/giangvien'
  post: any;
  private _giangviens: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _giangvien: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get giangviens$(): Observable<any> {
      return this._giangviens.asObservable();
  }
  get giangvien$(): Observable<any> {
    return this._giangvien.asObservable();
}
  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  AddGiangvien(data) {
      return this.giangviens$.pipe(
          take(1),
          switchMap((giangviens) =>
              this.http.post(this.urlApi, data).pipe(
                  map((giangvien) => {
                      this._giangviens.next([giangvien, ...giangviens]);

                      return giangvien;
                  })
              )
          )
      );
  }

  getGiangvien() {
      return this.http.get(this.urlApi).pipe(
          map((giangviens) => {
              this._giangviens.next(giangviens);

              return giangviens;
          })
      );
  }
  deleteGiangvien(id) {
      return this.giangviens$.pipe(
          take(1),
          switchMap((giangviens) =>
              this.http.delete(this.urlApi + `/${id}`).pipe(
                  map((isDelete) => {
                      const updategiangvien = giangviens.filter(
                          (e) => e.id != id
                      );

                      this._giangviens.next(updategiangvien);
                      return isDelete;
                  })
              )
          )
      );
  }

  updateGiangvien(data) {
      return this.giangviens$.pipe(
          take(1),
          switchMap((giangviens) =>
              this.http.patch(this.urlApi + `/${data.id}`, data).pipe(
                  map((updategiangvien) => {
                      // Find the index of the updated tag
                      const index = giangviens.findIndex(
                          (item) => item.id === data.id
                      );

                      // Update the tag
                      giangviens[index] = updategiangvien;

                      // Update the tags
                      this._giangviens.next(giangviens);

                      // Return the updated tag
                      return updategiangvien;
                  })
              )
          )
      );
  }
}
