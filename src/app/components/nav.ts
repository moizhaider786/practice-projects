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
        <a routerLink="create-expense">Create</a>
      </li>
      <li>
        <a routerLink="update-expense">Update</a>
      </li>
    </ul>
  </nav>`,
  styles: ``,
})
export class Nav {}
