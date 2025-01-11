import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss'
})
export class BottomNavigationComponent {
  constructor(
    private readonly router: Router,
  ) {}

  get currentPage() {
    return this.router.url;
  }
}
