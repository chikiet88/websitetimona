import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hocnghecungchuyengia',
    templateUrl: './hocnghecungchuyengia.component.html',
    styleUrls: ['./hocnghecungchuyengia.component.scss'],
})
export class HocnghecungchuyengiaComponent implements OnInit {
    constructor() {}
    youtubeLink = [
        { Tieude: 'Học phun xăm thẩm mỹ cùng chuyên gia P1 - Những dụng cụ cần thiết khi theo học nghề phun xăm?', link: 'https://www.youtube.com/embed/HjNODEFghK0' },
        { Tieude: 'Học phun xăm thẩm mỹ cùng chuyên gia P2 - Cách phân biệt các loại mực trong phun xăm', link: 'https://www.youtube.com/embed/RmVt5J4b1Ag' },
        { Tieude: 'Học chăm sóc và điều trị da cùng chuyên gia | Bài 1: Rửa mặt đúng cách', link: 'https://www.youtube.com/embed/0oPnDY1KqbE' },
        { Tieude: 'Học phun xăm thẩm mỹ cùng chuyên gia P3 - Hướng dẫn vẽ những dáng lông mày cơ bản', link: 'https://www.youtube.com/embed/D7nrbiprVOQ' },
        { Tieude: 'Học chăm sóc và điều trị da cùng chuyên gia | Bài 2: Tẩy tế bào chết', link: 'https://www.youtube.com/embed/cUDM7teEloI' },
        { Tieude: 'Học phun xăm thẩm mỹ cùng chuyên gia P4 - Hướng dẫn phun tạo hạt trên da giả cho người mới bắt đầu', link: 'https://www.youtube.com/embed/Nj2RxBPvRaI' },
    ];
    ngOnInit(): void {}
}
