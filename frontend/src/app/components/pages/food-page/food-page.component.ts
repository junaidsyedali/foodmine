import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-page',
  imports: [RouterLink, CommonModule, StarRatingComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
})
export class FoodPageComponent {
  food!: Food;
  constructor(activatedRoute: ActivatedRoute, foodService: FoodService) {
    activatedRoute.params.subscribe((params) => {
      if (params['foodId']) {
        this.food = foodService.getFoodById(params['foodId']);
      }
    });
  }
}
