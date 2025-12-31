import { Component } from '@angular/core';
import { Order } from '../../../shared/models/orders';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { TitleComponent } from '../../partials/title/title.component';
import { PaypalButtonComponent } from '../../partials/paypal-button/paypal-button.component';

@Component({
  selector: 'app-payment-page',
  imports: [OrderItemsListComponent, MapComponent, TitleComponent, PaypalButtonComponent],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent {
  order: Order = new Order();
  constructor(orderService: OrderService, router: Router) {
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        router.navigateByUrl('/checkout');
      },
    });
  }
}
