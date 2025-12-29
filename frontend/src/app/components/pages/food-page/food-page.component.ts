import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-food-page',
  imports: [RouterLink, CommonModule, StarRatingComponent, NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
})
export class FoodPageComponent {
  food!: Observable<Food>;

  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['foodId']) {
        this.food = foodService.getFoodById(params['foodId']);
      }
    });
  }

  async addToCart(): Promise<void> {
    this.cartService.addToCart(await lastValueFrom(this.food));
    this.router.navigateByUrl('/cart-page');
  }
}
