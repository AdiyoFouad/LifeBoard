
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink,
    RouterLinkActive,
    MatSidenavModule, 
    MatListModule,
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy{
  isMobile = signal(false);
  private breakpointObserver = inject(BreakpointObserver);
  private subscriptions = new Subscription();
  private router = inject(Router);

  ngOnInit(): void {

    const breakpointSubscription =  this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((result) => {
      this.isMobile.set(result.matches);
    });
    this.subscriptions.add(breakpointSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goAddTask(){
    this.router.navigate(['/task']);
  }

  
}
