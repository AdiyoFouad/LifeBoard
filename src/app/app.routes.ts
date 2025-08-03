import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskComponent } from './pages/task/task.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HabitListComponent } from './pages/habit-list/habit-list.component';
import { HabitFormComponent } from './pages/habit-form/habit-form.component';

export const routes: Routes = [{
    path:'',
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
];

