import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/orders';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-items-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css',
})
export class OrderItemsListComponent {
  @Input() order!: Order;
}
