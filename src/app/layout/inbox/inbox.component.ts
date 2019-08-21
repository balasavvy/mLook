import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  inBoxData: any;
 
  constructor(private dataService:DataServiceService) {
  
   }

  ngOnInit() {
      this.inBoxData=this.dataService.mailIData;
        
  }
  
}
