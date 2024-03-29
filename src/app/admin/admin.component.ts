import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any;
  deleteAll: boolean = false;
  filteredUsers: any[] = [];
  page = 1;
  pageSize = 10;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(res => {
      if (res) {
        this.users = res;
        for (let item of this.users) {
          item['checked'] = false;
          item['edit'] = false;
        }
        this.filteredUsers = JSON.parse(JSON.stringify(this.users));
        console.log(this.filteredUsers);
      }
    })
  }

  search(value: string) {
    let filteredUsers = [];
    for (let item of this.users) {
      if (item.name.toLowerCase().includes(value.toLowerCase()) || item.email.toLowerCase().includes(value.toLowerCase()) || item.role.toLowerCase().includes(value.toLowerCase())) {
        filteredUsers.push(item);
      }
    }
    this.filteredUsers = filteredUsers;
  }

  allChecked(event: any) {
    let startIndex = (this.page-1) * this.pageSize;
    let endIndex = (this.page-1) * this.pageSize + this.pageSize;
    console.log('start end: ', startIndex, endIndex);
    
    this.deleteAll = event.target.checked;
    for(let i=startIndex; i < endIndex; i++) {
      if(this.filteredUsers[i]) {
        this.filteredUsers[i].checked = this.deleteAll;
      } else {
        break;
      }
    }
  }

  checkAllChecked() {
    setTimeout(() =>{
      let arr = this.filteredUsers.filter((item: { checked: boolean; }) => item.checked == false);
      this.deleteAll = (arr.length > 0) ? false : true;
    })  
  }

  deleteUsers() {
    let size = this.filteredUsers.length;
    for (let i = 0; i < size; i++) {
      if (this.filteredUsers[i].checked) {
        let id = this.filteredUsers[i].id;
        let idx = this.users.findIndex((item: { id: any; }) => item.id == id);
        this.users.splice(idx, 1);
        this.filteredUsers.splice(i, 1);
        i--;
        size = this.filteredUsers.length;
      }
    }
    this.deleteAll = false;
  }

  deleteSingleUser(index: number) {
    let id = this.filteredUsers[index].id;
    let idx = this.users.findIndex((item: { id: any; }) => item.id == id);
    this.users.splice(idx, 1);
    this.filteredUsers.splice(index, 1);
    
    
  }

  loadPage() {
    this.deleteAll = false;
    this.filteredUsers = this.filteredUsers.map((item: { checked: boolean; }) => {
      item.checked = this.deleteAll;
      return item;
    })
  }
}

