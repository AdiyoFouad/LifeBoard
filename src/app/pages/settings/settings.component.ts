import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-settings',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  isDarkMode = localStorage.getItem('theme') ? localStorage.getItem('theme') == 'dark-theme' : false;
  contentContainer = document.getElementById('main-content');

  private readonly dialog = inject(MatDialog);

  toggleTheme(isDark: boolean) : void {
    this.isDarkMode = isDark;
    this.contentContainer?.classList.remove('light-theme', 'dark-theme');
    this.contentContainer?.classList.add(isDark ? 'dark-theme' : 'light-theme');
    localStorage.setItem('theme', isDark ? 'dark-theme' : 'light-theme');
  }

  resetData(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message : "Do you want clear all data ?",
        button: "Reset"
      }
    });
    dialogRef.afterClosed().pipe(
      filter(confirm => confirm)
    ).subscribe( _ => {
      localStorage.clear();
    });
    
  }


}
