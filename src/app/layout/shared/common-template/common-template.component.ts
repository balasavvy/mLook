import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'common-template',
  templateUrl: './common-template.component.html',
  styleUrls: ['./common-template.component.css']
})
export class CommonTemplateComponent implements OnInit {
  @Input('data') _data;
  @Input('folder') folder;
  
  inBoxData: any;
  preview:boolean;
  displayView: any;
  isItem=[];
  isPreviewItem: any=[];
  searchText;
  _ngxDefault: any=[];
  _isAsc =true;
  _dataBp: any[];
  _isData: boolean=false;
  constructor(private dataService:DataServiceService) {
    this._ngxDefault.push(this.items[0].id);
   
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
    console.log(this.folder);
    console.log(this._data);
    if(this._data.length){
      let bpData=JSON.parse(JSON.stringify(this._data));;
      this._dataBp=[...bpData];
      this._isData=true;
    }else{
      this._isData=false;
    }
  }
  filter(value: any){
    let getData= this._dataBp;
    const _Listings = JSON.parse(JSON.stringify(getData));
    if(value == 'unread'){
      let filter = _Listings.filter(function (x) {
        return x.unread;
      });
      this._data = filter.length?[...filter]:[]
    }else if(value == 'flagged'){
      let filter = _Listings.filter(function (x) {
        return x.flagged;
      });
      this._data = filter.length?[...filter]:[]
    }else{
      this._data = [...getData]
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
  
    sortByDate(){
      this._isAsc= this._isAsc?false:true;
      if(this._isAsc){
        this._data.sort((a, b) =>{const dateA:any = new Date(a.date);const dateB:any = new Date(b.date);return dateB - dateA});
      }else{
        this._data.sort((a, b) =>{const dateA:any = new Date(a.date);const dateB:any = new Date(b.date);return dateA - dateB});
      }     
    }
    flagMsg(item,event){
      console.log("flag");
    }
    deleteMsg(item,event){
      console.log("delete");
    }
}
