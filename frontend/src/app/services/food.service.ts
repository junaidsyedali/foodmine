import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import {
  FOOD_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  FOODS_URL,
} from '../shared/constants/url';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL).pipe(shareReplay(1));
  }

  getAllFoodBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm).pipe(shareReplay(1));
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL).pipe(shareReplay(1));
  }

  getAllFoodByTag(tag: string): Observable<Food[]> {
    return tag == 'All'
      ? this.getAllFoods()
      : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag).pipe(shareReplay(1));
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId).pipe(shareReplay(1));
  }
}
