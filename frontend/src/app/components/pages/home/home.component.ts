import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { SearchComponent } from '../../partials/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, StarRatingComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  foods: Food[] = [];

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.foods = foodService.getAllFoodBySearchTerm(params['searchTerm']);
      } else {
        this.foods = foodService.getAll();
      }
    });
  }
}
