import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { KhoahocService } from '../../khoahoc/khoahoc.service';

@Component({
  selector: 'app-cuocthiphunxam',
  templateUrl: './cuocthiphunxam.component.html',
  styleUrls: ['./cuocthiphunxam.component.scss']
})
export class CuocthiphunxamComponent implements OnInit {

  cuocthiphunxams: any[];
    danhmucs;
    constructor(
        private _HomeService: HomeService,
        private _khoahocService: KhoahocService
    ) {}
    ngOnInit(): void {
        this._khoahocService.getDanhmuc().subscribe();
        this._khoahocService.danhmucs$.subscribe((res) => {
            
            this.danhmucs = res?.filter((x) => x.Type == 'cuocthiphunxam');
            console.log(this.danhmucs);
            
        });
        this._HomeService.getKhoahoc().subscribe();
        this._HomeService.courses$.subscribe((result) => {
            this.cuocthiphunxams = result;
            let a = [];
            for (let i = 0; i < this.cuocthiphunxams?.length; i++) {
                for (let j = 0; j < this.danhmucs?.length; j++) {
                    if (this.cuocthiphunxams[i]?.idDM == this.danhmucs[j].id) {
                        a.push(this.cuocthiphunxams[i]);
                    }
                }
            }

            this.cuocthiphunxams = a
            console.log(a);
            
        });
    }
}
