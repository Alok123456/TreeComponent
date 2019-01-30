import { Component, OnInit, Input } from '@angular/core';
import { ListItemNode } from '../shared/check-list-database.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
@Input() empDetails: ListItemNode;
  constructor() { }

  ngOnInit() {
  }

}
