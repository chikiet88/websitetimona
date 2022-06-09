import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KhoahocService } from '../../khoahoc/khoahoc.service';

@Component({
    selector: 'app-tintuc',
    templateUrl: './tintuc.component.html',
    styleUrls: ['./tintuc.component.scss'],
})
export class TintucComponent implements OnInit {
    courses;
    danhmuc;
    paginate:number = 0
    indexPaginate:number
    arr = [];
    baiviet1={}
    baiviet2=[]
    baiviet3=[]
    constructor(
        private _khoahocService: KhoahocService,
        private route: ActivatedRoute
    ) {}
    
    spliceBaiviet(arr){
      if(arr?.length){
        this.baiviet1 = arr[0]
        this.baiviet2 = [arr[1],arr[2]]
        this.baiviet3 = [arr[3],arr[4],arr[5],arr[6]]
      }
        
    }
    paginateNumber(i){
        this.indexPaginate = i
        this.courses = this.arr[i]
        this.spliceBaiviet(this.courses)
        
    }
    ngOnInit(): void {
        const slug = this.route.snapshot.paramMap.get('slug');
        console.log(slug);
        this._khoahocService.getDanhmuc().subscribe()
        this._khoahocService.getDanhmucchitiet(slug).subscribe((res) => {
            this.danhmuc = res;
        });

        this._khoahocService.getKhoahoc().subscribe();
        this._khoahocService.courses$.subscribe((res) => {
            res = res?.filter((x) => x.idDM == this.danhmuc?.id);
            let x = res?.length / 7;

            for (let i = 0; i <= x; i++) {
                this.arr.push(res.slice(7 * i, 7 * i + 7));
            }
            this.courses = this.arr[0] 
            console.log(this.courses);
            
            this.spliceBaiviet(this.courses)
        });
    }
}
