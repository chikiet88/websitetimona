import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  
  private urlApi = 'https://v2api.timona.edu.vn/menu'
  post: any;
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);

   
  constructor(private http:HttpClient) { }


  get menu$(): Observable<any>{
    return this._menu.asObservable();
  }
  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  Addmenu(data){
    return this.http.post(this.urlApi, data).subscribe({
      next: data => {
        this.post = data
      }
    })
  }

  getMenu(){
    return this.http.get(this.urlApi).pipe(
      map((menus) => {

          this._menu.next(menus);
          
          
          
          return menus;
      }),
    )
  }
}
