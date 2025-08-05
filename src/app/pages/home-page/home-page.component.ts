import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true, 
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  fadeOut = false;
  private router = inject(Router);

  slogans: string[] = [
    "Organize your daily flow !",
    "Track tasks, budget & habits in one place !",
    "Your life, your dashboard !"
  ];

  displayText = signal('');
  currentText = 0;
  charIndex = 0;


  ngOnInit(): void {

    this.typeText();
  }

  typeText(){
    if (this.charIndex < this.slogans[this.currentText].length) {

      this.displayText.set(this.displayText() + this.slogans[this.currentText].charAt(this.charIndex));
      this.charIndex++;
      setTimeout(() => this.typeText(), 100);
    } else {
      setTimeout(() => this.nextText(), 2000);
    }
  }

  nextText(){
    this.charIndex = 0;
    this.displayText.set('');
    this.currentText++;
    if (this.currentText == this.slogans.length) {
      this.router.navigate(['/dashboard']);
    } else {
      this.typeText();
    }
  }
}
