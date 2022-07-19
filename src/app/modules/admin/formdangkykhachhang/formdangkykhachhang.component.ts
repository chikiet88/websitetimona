import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddBaivietService } from '../add-baiviet/add-baiviet.service';
import { FormdangkykhachhangService } from './formdangkykhachhang.service';

@Component({
  selector: 'app-formdangkykhachhang',
  templateUrl: './formdangkykhachhang.component.html',
  styleUrls: ['./formdangkykhachhang.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormdangkykhachhangComponent implements OnInit {
  displayedColumns: string[] = [
    'tenKH',
    'Hoten',
    'SDT',
    'Diachi',
];

trangthai: any[] = [
    { id: 1, title: 'New' },
    { id: 2, title: 'Đơn Rác' },
    { id: 3, title: 'Trùng Đơn' },
    { id: 4, title: 'Nhận Đơn' },
    { id: 5, title: 'Hủy Đơn' },
];
isOpen = false;
CDonhang: any;
khachhang: any[] = [];
products;
// displayedColumns: string[] = [
//     'idDH',
//     'hovaten',
//     'phone',
//     'TenSP',
//     // 'status',
//     'price',
// ];
courses:any[]
selectRow;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
dataSource: MatTableDataSource<any>;
triggerOrigin;
constructor(
    private _formDangkyKH: FormdangkykhachhangService,
    private _baivietSerice: AddBaivietService
) {}
ư
ngAfterViewInit(): void {}
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}
toggle(trigger: any, row) {
    this.selectRow = row;
    this.triggerOrigin = trigger;
    this.isOpen = !this.isOpen;
}

ngOnInit(): void {
    this._baivietSerice.getBaiviet().subscribe()
    this._baivietSerice.courses$.subscribe(res =>{
      if(res){this.courses = res}
    })
    this._formDangkyKH.getDataKhachhang().subscribe();
    this._formDangkyKH.khachhang$.subscribe((res) => {
        if (res) {
            for (let i = 0; i <= this.products?.length; i++) {
                for (let j = 0; j <= res?.length; j++) {
                    if (this.products[i]?.id == res[j]?.idP) {
                        let a = this.products[i]?.Tieude;
                        if (res[j]) {
                            Object.assign(res[j], {
                                tenSp: a,
                            });
                        }
                    }
                }
            }
        }
        res.forEach(element => {
          this.courses.forEach(x =>{
            if(element.idKH == x.id){
              element.tenKH = x.title
            }
          })
        });
        this.khachhang = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
}

}
