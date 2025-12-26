import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    });
  }

  onSearch(term: string) {
    if (term) {
      this.router.navigateByUrl('/search/' + term);
    }
  }
}
