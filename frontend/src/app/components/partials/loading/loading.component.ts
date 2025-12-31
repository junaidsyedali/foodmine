import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  isLoading: Observable<boolean>;

  constructor(loadingService: LoadingService) {
    this.isLoading = loadingService.isLoading;
  }
}
