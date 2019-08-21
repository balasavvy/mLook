import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css']
})
export class DeletedComponent implements OnInit {

  
  deletedData: any;
 
  constructor(private dataService:DataServiceService) {
  
   }

  ngOnInit() {
      this.deletedData=this.dataService.mailRData;
        
  }
}
