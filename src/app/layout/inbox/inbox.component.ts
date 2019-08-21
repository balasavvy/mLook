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
  isItem=[];
  isPreviewItem: any=[];
  searchText;
  constructor(private dataService:DataServiceService) { }

  ngOnInit() {
      this.inBoxData=this.dataService.getInBoxData;
        
  }
  previewFn(item){
    this.preview =true;
    this.renderItem(item);
    this.isPreviewItem=[];
    this.isPreviewItem[item.mId]=true;
  }
  renderItem(item: any) {
   this.displayView = item
  }
  mouseActive(item,event){
    this.isItem[item.mId]=true;
    console.log( this.isItem[item.mId])
  }
  mouseInActive(item,event){
     this.isItem[item.mId]=false;
     console.log( this.isItem[item.mId])
   }
   checkValue(item,event){
     if(event.target.checked){
      this.isPreviewItem[item.mId]=true;
     }else{
      this.isPreviewItem[item.mId]=false;
     }
   
   }
}
