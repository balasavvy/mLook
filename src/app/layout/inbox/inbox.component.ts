import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  inBoxData: any;
  preview:boolean;
  displayView: any;
  constructor(private dataService:DataServiceService) { }

  ngOnInit() {
      this.inBoxData=this.dataService.getInBoxData;
        
     
  }
  previewFn(item){
    this.preview =true;
    this.renderItem(item)
  }
  renderItem(item: any) {
   this.displayView = item
  }
}
