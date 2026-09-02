import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Foodservice, Food } from '../services/food/foodservice';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  foods: Food[] = [];
  private readonly fs = inject(Foodservice);

  ngOnInit(): void {
    this.foods = this.fs.getAll();
  }

}
