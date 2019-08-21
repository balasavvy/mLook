import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isFolder: Boolean =true;

  constructor() { }

  ngOnInit() {
  }
  showFolders(){
    this.isFolder = this.isFolder?false:true;
  }
}
