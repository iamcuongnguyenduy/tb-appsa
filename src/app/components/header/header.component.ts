import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import RegisterComponent from '../register/register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RegisterComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export  class HeaderComponent {

}
