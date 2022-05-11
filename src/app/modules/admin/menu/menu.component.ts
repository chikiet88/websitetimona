    import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
    import { MenuService } from './menu.service';

    @Component({
        selector: 'app-menu',
        templateUrl: './menu.component.html',
        styleUrls: ['./menu.component.css'],
    })
    export class MenuComponent implements OnInit {
        themes: any;
        menu: any;
        theme: any;
        message: 'chon theme';
        MenuList: FormGroup;
        selectTheme: any;
        idSelect;
        public config = {
            htmlSupport: {
                allow: [
                    {
                        name: /.*/,
                        attributes: true,
                        classes: true,
                    },
                ],
            },
        };

        constructor(private MenuService: MenuService, private fb: FormBuilder) {}

        onSubmit() {
            this.MenuService.Addmenu(this.MenuList.value).subscribe();
            alert('Tạo nội dung thành công');
        }

        onSelect(item) {
        
            this.MenuList.get('parentid').setValue(item.id);
        }
        onSelectMenu(item) {
            this.MenuList.addControl('id', new FormControl(item.id));
            this.MenuList.get('id').setValue(item.id);
            this.MenuList.get('title').setValue(item.title);
            this.MenuList.get('slug').setValue(item.slug);
            this.MenuList.get('parentid').setValue(item.parentid);
            this.idSelect = item.id;
        }
        deleteMenu() {
            alert('Xóa Menu thành công');
            this.MenuService.deleteMenu(this.idSelect).subscribe();
        }
        updateMenu() {
            alert('Cập nhật Menu thành công');
            this.MenuService.updateMenu(this.MenuList.value).subscribe();
        }

        ngOnInit(): void {
            this.MenuList = this.fb.group({
                title: [''],
                parentid: [''],
                slug: [''],
            });

            this.MenuService.getMenu().subscribe();
            this.MenuService.menu$.subscribe((menu) => {
                this.menu = menu;
            });

            // this.addheaderService.getHeader().subscribe();

            // this.addheaderService.themes$.subscribe((themes)=>{
            //   this.themes = themes
            // })
        }
    }
