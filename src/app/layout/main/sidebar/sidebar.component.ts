import { Component, OnInit, ElementRef, ViewChild, Renderer2, OnChanges } from '@angular/core';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {CustomFolderComponent } from '../../custom/custom.component';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnChanges {
  isFolder: Boolean =true;
  @ViewChild('custom') custom: ElementRef;
  modalRef: BsModalRef;
  @ViewChild('newfolder') newfolder: ModalDirective;
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };
  model: any = {};
  IboxUnreadCount: any;
  SboxUnreadCount: any;
  DboxUnreadCount: any;
  _isCustom: boolean;
  _customData: any;
  constructor(private toastr: ToastrService,private dataService:DataServiceService,private modalService: BsModalService,private renderer: Renderer2,private router:Router) { }

  ngOnInit() {
    
    this.dataService.someProp.subscribe(res => {
      this.IboxUnreadCount = this.dataService.IunreadCount().length;
      this.SboxUnreadCount = this.dataService.SunreadCount().length;
      this.DboxUnreadCount = this.dataService.DunreadCount().length;
      if(this.dataService.mailCData.length){
        this._isCustom=true;
        this._customData=this.dataService.mailCData;
        for(let i=0;i<this._customData.length;i++){
          this.router.config.unshift({
            path: this._customData[i].path  ,
            component: CustomFolderComponent
          });
        }
      }
    });
  }
  ngOnChanges() {
    
      
  }
  showFolders() {
    this.isFolder = this.isFolder ? false : true;
  }
  newFolder() {
    //this.model.folderName='';
    this.modalRef = this.modalService.show(this.newfolder, this.config);
  }
  onSubmit(event) {
   
    let folderName=this.model.folderName;
    let dataObj={
      path:folderName
    }
   if(this.dataService.mailCData.length){
      this.dataService.customDataArray = this.dataService.mailCData;
      this.dataService.CustomData = dataObj; 
      let obj = this.dataService.customDataArray; //get the data from array
      this.dataService.mailCData = obj //set into storage  
    }else{
      this.dataService.CustomData = dataObj; //push the data to existing array
      let obj = this.dataService.customDataArray; //get the data from array
      this.dataService.mailCData = obj //set into storage  
      
    }
    if(this.dataService.mailCData){
    this._isCustom=true;
    this._customData=this.dataService.mailCData
    }
   this.router.config.unshift({
      path: this.model.folderName,
      component: CustomFolderComponent
    });
  
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.toastr.success("New Folder Created!");
  }

  hide() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
