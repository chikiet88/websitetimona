import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  private urlApi = 'https://v2api.timona.edu.vn/cauhinh'
  post: any;
  private _themes: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _footer: BehaviorSubject<any | null> = new BehaviorSubject(null);


   
  constructor(private http:HttpClient) { }

  get footer$(): Observable<any>{
    return this._footer.asObservable();
  }




  getFooter(){
    return this.http.get('https://v2api.timona.edu.vn/cauhinh').pipe(
      map((footer) => {

          this._footer.next(footer);
          return footer;
      }),
    )
  }
}
