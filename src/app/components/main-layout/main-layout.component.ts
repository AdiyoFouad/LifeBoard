import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AddBudgetDialogComponent } from '../add-budget-dialog/add-budget-dialog.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    
    CommonModule,
    RouterOutlet, 
    RouterLink,
    RouterLinkActive,
    MatSidenavModule, 
    MatListModule,
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit, OnDestroy{
  isMobile = signal(false);
  private breakpointObserver = inject(BreakpointObserver);
  private subscriptions = new Subscription();
  private router = inject(Router);

  
  isDarkMode = false;
  showSplash = signal(true);
  
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {

    //this.subscriptions.add(routerSubscription);
 
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    this.isDarkMode = savedTheme == 'dark-theme';
    const contentContainer = document.getElementById("main-content");
    contentContainer?.classList.add(this.isDarkMode ? 'dark-theme' : 'light-theme');


    const breakpointSubscription =  this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((result) => {
      this.isMobile.set(result.matches);
    });
    this.subscriptions.add(breakpointSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goTo(page : string){
    this.router.navigate(['', page]);
  }

  addBudget(){
      const dialogRef = this.dialog.open(AddBudgetDialogComponent);
      dialogRef.afterClosed().pipe(
        filter(confirm => confirm)
      ).subscribe(_ => {
        this.router.navigate(['/budget'])
      });
    }

  
}
