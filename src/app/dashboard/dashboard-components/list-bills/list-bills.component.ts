import { Component, OnInit } from '@angular/core';
import { BillsService } from '../services/bills.service';
import { Bills } from 'src/app/shared/models/bill.interface';

@Component({
  selector: 'app-list-bills',
  templateUrl: './list-bills.component.html',
  styleUrls: ['./list-bills.component.css']
})
export class ListBillsComponent implements OnInit {

  bills: Bills[] =[];
  Total: number = 0;

  constructor(private api: BillsService) { }

  ngOnInit(): void {
    //debugger
    this.api.getAll().subscribe((data) => {
      let dataResponse: Bills[] = data;
      if(dataResponse != null){
        this.bills = dataResponse;
      }
    })
  }

}
