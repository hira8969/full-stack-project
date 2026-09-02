import { Injectable } from '@angular/core';

export interface Food {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class Foodservice {

  constructor() {
  }

  getAll(): Food[] {
    return [
      {
        id: 1,
        name: 'Pizza',
        image: '/pizza1.jpg',
        price: 249,
        category: 'Pizza',
        description: 'Delicious cheesy pizza with fresh toppings.',
        rating: 4.5
      },

      {
        id: 2,
        name: 'Burger',
        image: '/burger1.jpg',
        price: 149,
        category: 'Burger',
        description: 'Juicy burger with crispy vegetables and cheese.',
        rating: 4.3
      },

      {
        id: 3,
        name: 'Chicken Biryani',
        image: '/chickenbiryani.jpg',
        price: 199,
        category: 'Biryani',
        description: 'Aromatic chicken biryani with authentic spices.',
        rating: 4.7
      },

      {
        id: 4,
        name: 'Veg Biryani',
        image: '/veg biryani.jpg',
        price: 169,
        category: 'Biryani',
        description: 'Flavorful veg biryani prepared with fresh vegetables.',
        rating: 4.2
      }
    ];
  }

  getById(id: number): Food | undefined {
    return this.getAll().find(food => food.id === id);
  }

}