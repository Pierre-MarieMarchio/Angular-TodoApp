import { Component } from '@angular/core';
import { HeaderComponent } from "../../../core/layouts/header/header.component";
import { SidBarComponent } from "../../../core/layouts/sid-bar/sid-bar.component";
import { TodoListComponent } from "../components/todo-list/todo-list.component";
import { TodoInputComponent } from "../components/todo-input/todo-input.component";

@Component({
  selector: 'app-todo-list-page',
  imports: [HeaderComponent, SidBarComponent, TodoListComponent, TodoInputComponent],
  templateUrl: './todo-list-page.component.html',
  styleUrl: './todo-list-page.component.scss'
})
export class TodoListPageComponent {

}
