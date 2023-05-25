import { Component, OnInit } from '@angular/core';
import { UsersModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit { 

  user = new UsersModel();

  users: UsersModel[] = [];

  constructor(private userService: UsersService, private toastr: ToastrService) {      
  }

  deleteUser(id: any) {
    this.userService.delete(id).then((response) => {
      this.toastr.success('Delete successfully..')
    })
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.userService.read().subscribe(response => {
      this.users = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as  UsersModel
        }
      });
    });
  }

}
