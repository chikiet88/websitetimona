import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CauhinhService {
  private urlApi = 'https://v2api.timona.edu.vn/cauhinh'

  post: any;
  private _cauhinhs: BehaviorSubject< any | null> = new BehaviorSubject(null);
  private _cauhinh: BehaviorSubject<any | null> = new BehaviorSubject(null);


   
  constructor(private http:HttpClient) { }

  get cauhinh$(): Observable<any>{
    return this._cauhinh.asObservable();
  }
  get cauhinhs$(): Observable<any>{
    return this._cauhinhs.asObservable();
  }
 

  addCauhinh(data){
    console.log(data);
    
    return this.cauhinhs$.pipe(
      take(1),
      switchMap(cauhinhs => this.http.post(this.urlApi,data).pipe(
        map((cauhinh)=>{
          
          this._cauhinhs.next([cauhinh,...cauhinhs ]);

          return cauhinh
        })
      ))
    )
  }

  deleteCauhinh(id){

    return this.cauhinhs$.pipe(
      take(1),
      switchMap(courses=>this.http.delete(`https://v2api.timona.edu.vn/cauhinh/${id}`).pipe(map((isDelete => {
        
       const updateCourses =  courses.filter(e => e.id != id);
        
        this._cauhinhs.next(updateCourses)
        return isDelete

      }))))
    )    
  }


  getCauhinh(){
    return this.http.get('https://v2api.timona.edu.vn/cauhinh').pipe(
      map((cauhinhs) => {

          this._cauhinhs.next(cauhinhs);
          return cauhinhs;
      }),
    )
  }

  updateCauhinh(data){
    return this.cauhinhs$.pipe(
      take(1),
      switchMap(courses => this.http.patch(`https://v2api.timona.edu.vn/cauhinh/${data.id}`, data).pipe(
          map((updateCourse) => {

              // Find the index of the updated tag
              const index = courses.findIndex(item => item.id === item.id);

              // Update the tag
              courses[index] = data;

              // Update the tags
              this._cauhinhs.next(courses);

              // Return the updated tag
              return updateCourse;
          })
      ))
  );
    
  }
}
