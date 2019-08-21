import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private dataService:DataServiceService) { }

  ngOnInit() {
      
        console.log(this.dataService.getInpoxData());
     
  }
  
}
