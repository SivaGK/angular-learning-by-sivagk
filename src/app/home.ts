import { Component } from '@angular/core';
import { HelloComponent  } from  './hello.component';
@Component({
  selector: 'home',
  template: `<hello name="{{ name }}"></hello>
<p class="list-group-item-info list-group-item">
 Angular is a JavaScript framework for building web applications and apps in JavaScript, html, and TypeScript, which is a superset of JavaScript. Angular provides built-in features for animation, http service, and materials which in turn has features such as auto-complete, navigation, toolbar, menus, etc.
	Start learning to see some magic happen :)
</p>
<p class="list-group-item-warning list-group-item">
 Working with employee details in an organization.
</p>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class Home{
name:string = "Angular 8 By Siva GK...";
}