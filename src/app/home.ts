import { Component } from '@angular/core';
import { HelloComponent  } from  './hello.component';
@Component({
  selector: 'home',
  template: `<hello name="{{ name }}"></hello>
<p>
	Start editing to see some magic happen :)
</p>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class Home{
name:string = "Angular 8 By Siva GK...";
}