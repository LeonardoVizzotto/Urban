import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      <p>Copyright &copy; Leonardo Vizzotto</p>
      <ul>
        <li>
          <a
            rel="author noreferrer noopener"
            href="https://www.linkedin.com/in/leonardo-vizzotto/"
            >LinkedIn</a
          >
        </li>
        <li>
          <a
            rel="author noreferrer noopener"
            href="https://github.com/LeonardoVizzotto"
            >Github</a
          >
        </li>
      </ul>
    </footer>
    <app-toast></app-toast>
    <app-loader></app-loader>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
