import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddContactService {

  private urlApi = 'https://localhost:3000/contact'
  post: any;
  private _contact: BehaviorSubject<any | null> = new BehaviorSubject(null);

   
  constructor(private http:HttpClient) { }


  get contact$(): Observable<any>{
    return this._contact.asObservable();
  }
  // get theme$(): Observable<any>{
  //   return this._themes.asObservable();
  // }

  addContact(data){
    return this.http.post(this.urlApi, data).subscribe({
      next: data => {
        this.post = data
      }
    })
  }

  // getMenu(){
  //   return this.http.get(this.urlApi).pipe(
  //     map((menus) => {

  //         this._menu.next(menus);
          
          
          
  //         return menus;
  //     }),
  //   )
  // }
}
