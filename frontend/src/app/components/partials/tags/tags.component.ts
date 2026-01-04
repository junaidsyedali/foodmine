import { Component } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { FoodService } from '../../../services/food.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tags',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  tags?: Observable<Tag[]>;

  constructor(foodService: FoodService) {
    this.tags = foodService.getAllTags();
  }
}
