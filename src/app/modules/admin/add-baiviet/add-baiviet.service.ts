import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { Khoahoc } from '../theme/theme.types';
import {environment} from "../../../../environments/environment.prod"
@Injectable({
  providedIn: 'root'
})
export class AddBaivietService {

  // private urlApi = 'https://v2api.timona.edu.vn/theme'
  private urlApi = 'https://v2api.timona.edu.vn'
  // private urlApi = 'http://localhost:3000'


  
  post: any;
  private _themes: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _courses: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject(null);


  constructor(private http:HttpClient) { }


  get themes$(): Observable<Khoahoc[]>{
    return this._themes.asObservable();
  }
  get theme$(): Observable<Khoahoc[]>{
    return this._themes.asObservable();
  }
  get menu$(): Observable<any>{
    return this._menu.asObservable();
  }
  get courses$(): Observable<Khoahoc[]>{
    return this._courses.asObservable();
  }

  postCourse(data){
    return this.courses$.pipe(
      take(1),
      switchMap(courses => this.http.post(this.urlApi+'/baiviet',data).pipe(
        map((course)=>{
          
          this._courses.next([course,...courses ]);

          return course
        })
      ))
    )
  }

  getTheme(){
    return this.http.get(this.urlApi+'/theme').pipe(
      map((themes) => {

          this._themes.next(themes);          
          return themes;
      }),
    )
  }
  getMenu(){
    return this.http.get(this.urlApi+'/menu').pipe(
      map((menu) => {

          this._menu.next(menu);
          return menu;
      }),
    )
  }
  getBaiviet(){
    return this.http.get(this.urlApi+'/baiviet').pipe(
      map((courses) => {

          this._courses.next(courses);
          return courses;
      }),
    )
  }


  deleteBaiviet(id){

    return this.courses$.pipe(
      take(1),
      switchMap(courses=>this.http.delete(this.urlApi+`/baiviet/${id}`).pipe(map((isDelete => {
        
       const updateCourses =  courses.filter(e => e.id != id);
        
        this._courses.next(updateCourses)
        return isDelete

      }))))
    )

  }
  updateBaiviet(data){
    return this.courses$.pipe(
      take(1),
      switchMap(courses => this.http.patch(this.urlApi+`/baiviet/${data.id}`, data).pipe(
          map((updateCourse) => {

              // Find the index of the updated tag
              const index = courses.findIndex(item => item.id === item.id);

              // Update the tag
              courses[index] = data;

              // Update the tags
              this._courses.next(courses);

              // Return the updated tag
              return updateCourse;
          })
      ))
  );
    
  }

gDriveUploader(file): Promise<any> {
  let authToken = 'ya29.A0ARrdaM9A7uRBS-5pQIQod8v9Em5LbJIsuqLSJeW-1_spMleRUGcE6pa1pE20fdFLJmuzCCzWNrnqz2FFB5XisGS8YwTB2EFTU8ByTAbnoH9POHhu3f6nSHUTz80vHjcTL71F3JQsO3dfBAciCw7CnsU0eWXdYUNnWUtBVEFTQVRBU0ZRRl91NjFWbExJZ2hlN1R4QTY1YmZQY0RXTzdyQQ0163'
  const url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable`
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json; charset=UTF-8',
      });
      let options =  ({ 
        headers: headers,
      });
      console.log(file);
      
      return this.http.post(`${url}`, {name: file.name}, options) //just set the name
          .toPromise()
            .then(response => console.log(response)
            ) //call second function to upload `file` to proper URI from response
            // .then(response => {
            //     let id = response.json().id //parse id of uploaded file
            //     let resp = {fileName: file.fullName, fileType: file.fileType, fileSize: file.size, fileId: id} //create an object with file file properties, if you need that
            //     return resp // return object back to function that called this service
            // })
            .catch(e=>console.log(e));
  }
  gDriveUploadFile(file, url): Promise<any> { //file and url we got from first func
    let authToken = 'ya29.A0ARrdaM9A7uRBS-5pQIQod8v9Em5LbJIsuqLSJeW-1_spMleRUGcE6pa1pE20fdFLJmuzCCzWNrnqz2FFB5XisGS8YwTB2EFTU8ByTAbnoH9POHhu3f6nSHUTz80vHjcTL71F3JQsO3dfBAciCw7CnsU0eWXdYUNnWUtBVEFTQVRBU0ZRRl91NjFWbExJZ2hlN1R4QTY1YmZQY0RXTzdyQQ0163'
        let headers = new HttpHeaders ({
          'Authorization': 'Bearer ' + authToken,
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Upload-Content-Type': file.type
        });
        let options =  ({ 
          headers: headers,
        });
        return this.http.post(`${url}`, file, options) //call proper resumable upload endpoint and pass just file as body
            .toPromise()
    }
}
