import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  template: `   
  <nav>
    <ul>
      <li>
        <a routerLink="">Home</a>
      </li>
      <li>
        <a routerLink="categories">Categories</a>
      </li>
    </ul>
  </nav>`,
  styles: ``,
})
export class Nav {}
