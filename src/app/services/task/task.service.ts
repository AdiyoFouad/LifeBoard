import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { Observable, of } from 'rxjs';
import { TaskPriority, TaskStatus } from '../../utils/task.utils';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  tasks : Task[] = [];
  currentIndex : number = 1;

  constructor() {
    this.load();
  }

  private save(){
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private load(){
    const taskData = localStorage.getItem('tasks');
    if (taskData) {
      this.tasks = JSON.parse(taskData).map((taskJson : any) => Task.fromJson(taskJson));
      this.currentIndex = Math.max(...this.tasks.map(task => task.id))
    } else {
      this.init();
      this.save();
    }
  }

  private init(){
    const task0 = new Task();
    task0.id = 1;
    task0.title = 'Faire les courses';
    task0.description = 'Acheter du lait, du pain, des œufs et des fruits.';
    task0.priority = TaskPriority.MEDIUM;
    task0.status = TaskStatus.TODO;
    task0.deadline = new Date('2025-08-01');
    task0.created_at = new Date('2025-07-20');
    this.tasks.push(task0);

    const task1 = new Task();
    task1.id = 2;
    task1.title = 'Réviser Angular';
    task1.description = 'Revoir les modules, services et routing pour le projet final.';
    task1.priority = TaskPriority.HIGH;
    task1.status = TaskStatus.IN_PROGRESS;
    task1.deadline = new Date('2025-08-03');
    task1.created_at = new Date('2025-07-21');
    this.tasks.push(task1);

    const task2 = new Task();
    task2.id = 3;
    task2.title = 'Nettoyer l’appartement';
    task2.description = 'Passer l’aspirateur, nettoyer la cuisine et la salle de bain.';
    task2.priority = TaskPriority.LOW;
    task2.status = TaskStatus.TODO;
    task2.deadline = new Date('2025-08-05');
    task2.created_at = new Date('2025-07-22');
    this.tasks.push(task2);

    const task3 = new Task();
    task3.id = 4;
    task3.title = 'Rendez-vous médical';
    task3.description = 'Consultation chez le dentiste à 10h30.';
    task3.priority = TaskPriority.MEDIUM;
    task3.status = TaskStatus.TODO;
    task3.deadline = new Date('2025-08-02');
    task3.created_at = new Date('2025-07-23');
    this.tasks.push(task3);

    const task4 = new Task();
    task4.id = 5;
    task4.title = 'Finaliser le rapport';
    task4.description = 'Compléter et envoyer le rapport trimestriel à la direction.';
    task4.priority = TaskPriority.HIGH;
    task4.status = TaskStatus.IN_PROGRESS;
    task4.deadline = new Date('2025-08-06');
    task4.created_at = new Date('2025-07-24');
    this.tasks.push(task4);

    const task5 = new Task();
    task5.id = 6;
    task5.title = 'Réserver les vacances';
    task5.description = 'Trouver un hôtel et réserver les billets pour Barcelone.';
    task5.priority = TaskPriority.MEDIUM;
    task5.status = TaskStatus.DONE;
    task5.deadline = new Date('2025-07-28');
    task5.created_at = new Date('2025-07-10');
    this.tasks.push(task5);

    const task6 = new Task();
    task6.id = 7;
    task6.title = 'Appeler le service client';
    task6.description = 'Contacter l’assistance pour un problème de facturation.';
    task6.priority = TaskPriority.LOW;
    task6.status = TaskStatus.TODO;
    task6.deadline = new Date('2025-08-04');
    task6.created_at = new Date('2025-07-25');
    this.tasks.push(task6);

    const task7 = new Task();
    task7.id = 8;
    task7.title = 'Préparer la présentation';
    task7.description = 'Créer les slides pour la réunion de lundi matin.';
    task7.priority = TaskPriority.HIGH;
    task7.status = TaskStatus.IN_PROGRESS;
    task7.deadline = new Date('2025-08-01');
    task7.created_at = new Date('2025-07-26');
    this.tasks.push(task7);

    const task8 = new Task();
    task8.id = 9;
    task8.title = 'Envoyer les invitations';
    task8.description = 'Inviter les participants à l’atelier de design.';
    task8.priority = TaskPriority.MEDIUM;
    task8.status = TaskStatus.DONE;
    task8.deadline = new Date('2025-07-29');
    task8.created_at = new Date('2025-07-19');
    this.tasks.push(task8);

    const task9 = new Task();
    task9.id = 10;
    task9.title = 'Changer mot de passe';
    task9.description = 'Mettre à jour le mot de passe de la boîte mail pro.';
    task9.priority = TaskPriority.LOW;
    task9.status = TaskStatus.TODO;
    task9.deadline = new Date('2025-08-07');
    task9.created_at = new Date('2025-07-27');
    this.tasks.push(task9);

  }

  /**
   * return of() pour simuler le retour de réponse d'une requête HttpClient
   * (un observable) au lieu d'un tableau tout court 
   */

  getAll() : Observable<Task[]> {
    return of(this.tasks);
  }

  get(id: number) : Observable<Task | undefined>{
    const task = this.tasks.find(task => task.id == id);
    return of(task ? task : undefined);
  }

  add(task : Task) : Observable<Task>{

    task.id = this.currentIndex;
    this.tasks.push(task);
    this.currentIndex++;

    this.save();

    return of(task);
  }

  update(task : Task) : Observable<Task>{

    const taskIndex = this.tasks.findIndex((originalTask) => originalTask.id == task.id)
    if (taskIndex != -1) {
      this.tasks[taskIndex] = task;
    }
    this.save();

    return of(task);
  }

  delete(id:number) : void {
    const taskIndex = this.tasks.findIndex((originalTask) => originalTask.id == id)
    if (taskIndex != -1) {
      this.tasks.splice(taskIndex, 1);
    }
    this.save();
  }


}
