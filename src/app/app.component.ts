import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from "./views/landing/landing.component";
import { RoomComponent } from './views/room/room.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LandingComponent, SvgIconComponent, CommonModule, RoomComponent]
})
export class AppComponent {
  title = 'tdc';
}
