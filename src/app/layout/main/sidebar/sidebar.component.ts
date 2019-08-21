import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { InboxComponent } from '../../inbox/inbox.component';
import { SpamComponent } from '../../spam/spam.component';
import * as $ from 'jquery';
import {CustomFolderComponent } from '../../custom/custom.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isFolder: Boolean =true;
  @ViewChild('custom') custom: ElementRef;
  modalRef: BsModalRef;
  @ViewChild('newfolder') newfolder: ModalDirective;
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };
  model: any = {};
  constructor(private modalService: BsModalService,private renderer: Renderer2,private router:Router) { }

  ngOnInit() {
  }
  showFolders(){
    this.isFolder = this.isFolder?false:true;
  }
  newFolder(){
    
    this.modalRef = this.modalService.show(this.newfolder, this.config);
  }
  onSubmit(event){
    
    const li: HTMLDListElement = this.renderer.createElement('li');
    li.innerHTML = this.model.folderName;
    li.className = "list-group-item customLink";
    li.setAttribute("routerLink", this.model.folderName);
    this.renderer.appendChild(this.custom.nativeElement, li);
    this.router.config.unshift(
      { path:this.model.folderName, component: CustomFolderComponent}      
     );
    
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.renderEvents();
  }
  renderEvents() {
    let self=this;
    $('.customLink').on("click",function(){
      var $this=$(this);
      let thisRouteLink = $this.attr("routerLink");
      self.router.navigate([thisRouteLink]);
    })
  }
  hide() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
