import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskComponent } from './pages/task/task.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HabitListComponent } from './pages/habit-list/habit-list.component';
import { HabitFormComponent } from './pages/habit-form/habit-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { Component } from '@angular/core';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

export const routes: Routes = [{
    path:'',
    component: HomePageComponent
}, {
    path:'',
    component: MainLayoutComponent,
    children : [
        {
            path:'dashboard',
            component: DashboardComponent
        }, {
            path:'tasks',
            component: TaskListComponent
        }, {
            path: 'task',
            children : [{
                path:'',
                component: TaskComponent
            }, {
                path:':id',
                component: TaskComponent
            }]
        }, {
            path:'budget',
            component: BudgetComponent
        }, {
            path:'habits',
            component: HabitListComponent
        }, {
            path: 'habit',
            children : [{
                path:'',
                component: HabitFormComponent
            }, {
                path:':id',
                component: HabitFormComponent
            }]
        }, {
            path:'settings',
            component: SettingsComponent
        }
    ]
}
];

