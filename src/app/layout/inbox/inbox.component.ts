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
  preview:boolean;
  displayView: any;
  isItem=[];
  isPreviewItem: any=[];
  searchText;
  _ngxDefault: any=[];
  constructor(private dataService:DataServiceService) {
    this._ngxDefault.push(this.items[0].id);
    console.log(this._ngxDefault)
   }
  public items= [{
    "id":'all',
    "name":'All'
  },
  {
    "id":'flagged',
    "name":'Flagged'
  },
  {
    "id":'unread',
    "name":'Unread'
  }];
  ngOnInit() {
      this.inBoxData=this.dataService.mailIData;
        
  }
  filter(value: any){
    let getData= this.dataService.mailIData;
    const _Listings = JSON.parse(JSON.stringify(getData));
    if(value == 'unread'){
      let filter = _Listings.filter(function (x) {
        return x.unread;
      });
      this.inBoxData = filter.length?[...filter]:[]
    }else if(value == 'flagged'){
      let filter = _Listings.filter(function (x) {
        return x.flagged;
      });
      this.inBoxData = filter.length?[...filter]:[]
    }else{
      this.inBoxData = [...getData]
    }
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
   public doNgxDefault(): any {
   
        return this._ngxDefault;
    }
}
