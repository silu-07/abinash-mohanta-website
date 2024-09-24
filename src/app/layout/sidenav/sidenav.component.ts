import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  toggleMenu() {
    let navMenu = document.getElementById("mobile-menu-js");
    if (navMenu?.style.height == "0px") {
      navMenu?.setAttribute("style", "height:134px");
    } else {
      navMenu?.setAttribute("style", "height:0px");;
    }
  }
  
}
