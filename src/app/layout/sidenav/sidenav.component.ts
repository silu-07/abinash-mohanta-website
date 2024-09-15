import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

   openMenu() { 
    if (document?.querySelector("#sidebar")?.classList.contains("expand")) {
      document?.querySelector("#sidebar")?.classList.replace("expand", "collapse");
    }
    else {
      document?.querySelector("#sidebar")?.classList.replace("collapse", "expand");
    }
  }


}
