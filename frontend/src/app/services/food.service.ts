import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  getAllFoods(): Food[] {
    return sample_foods;
  }

  getAllFoodBySearchTerm(searchTerm: string): Food[] {
    return this.getAllFoods().filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodByTag(tag: string): Food[] {
    return tag == 'All'
      ? this.getAllFoods()
      : this.getAllFoods().filter((food) => food.tags?.includes(tag));
  }

  getFoodById(foodId: string): Food {
    return this.getAllFoods().find((food) => food.id == foodId) ?? new Food();
  }
}
