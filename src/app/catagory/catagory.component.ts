import { Component, OnInit } from '@angular/core';
import { CatagoryService } from '../services/catagory.service';
import { CatagoryModel } from '../models/catagory.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.css']
})
export class CatagoryComponent implements OnInit {

  catagaries: CatagoryModel[] = [];
  catagary = new CatagoryModel()
  Title = '';

  constructor(private catagaryService: CatagoryService, private toastr: ToastrService) { }

  addCatagary() {
    this.Title = 'Add catagory';
    this.catagary = new CatagoryModel();
  }
  editCatagory(_catagory: CatagoryModel) {
    this.Title = 'Edit Catagory';
    this.catagary = _catagory;
  }
  deleteCatagory(id: any) {
    this.catagaryService.delete(id).then((response) => {
      this.toastr.success('Deleted successfully..!!');
    })
  }
  saveMethod() {
    if (this.catagary.id) {
      this.catagaryService.update(this.catagary.id, this.catagary)
        .then((response) => {
          this.toastr.success('Edit successfully..!!');
        });
    }
    else {
      this.catagaryService.create(this.catagary)
        .then((resonse) => {
          this.toastr.success('Added successfully..!!');
        })
    }
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.catagaryService.read().subscribe(response => {
      this.catagaries = response.map((data) => {
        return {
          id: data.payload.doc.id,
          ...data.payload.doc.data() as CatagoryModel
        }
      })
      console.log(this.catagaries)
    })
  }

}



