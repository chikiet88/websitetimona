import { Component, OnInit } from '@angular/core';
import { KhoahocService } from '../../khoahoc/khoahoc.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  config;
  danhmucs;
  constructor(
      private _khoahocService: KhoahocService
  ) {}
 nest = (items, id = '', link = 'pid') =>
  items
      ?.filter((item) => item[link] == id)
      .map((item) => ({
          ...item,
          children: this.nest(items, item.id),
      }));
  ngOnInit(): void {
      // window.location.href = 'https://v1.timona.edu.vn/tin-tuc-su-kien.html'
      this.config = {
          loop: true,
          autoplay: {
              delay: 2000,
              disableOnInteraction: false,
          },

          freeMode: true,
      };
      this._khoahocService.getDanhmuc().subscribe();
      this._khoahocService.danhmucs$.subscribe((res) => {
          this.danhmucs = res?.filter((x) => x.Type == 'tintucsukien');
          this.danhmucs = this.nest(this.danhmucs?.reverse());
      });
     
  }
}
