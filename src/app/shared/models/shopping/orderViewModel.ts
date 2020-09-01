import { OrderDetailsViewModel } from '.';
import { InvoiceViewModel } from './invoiceViewModel';

export class OrderViewModel {
  totalAmount: number;
  orderDetails: OrderDetailsViewModel[];
  invoice: InvoiceViewModel;
}
