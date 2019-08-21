import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.component.html',
  styleUrls: ['./spam.component.css']
})
export class SpamComponent implements OnInit {

  spamData: any;
 
  constructor(private dataService:DataServiceService) {
  
   }

  ngOnInit() {
      this.spamData=this.dataService.mailSData;
        
  }
  
}
