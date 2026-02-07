import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {
  ThemeGeneratorButtonComponent,
  ThemeGeneratorDrawerComponent,
} from './components/theme-generator';

@Component({
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ThemeGeneratorButtonComponent,
    ThemeGeneratorDrawerComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Luma UI';
}
