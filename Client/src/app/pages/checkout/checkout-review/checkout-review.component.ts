import { Component, Input } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent {
  @Input() appStepper?: CdkStepper;


  constructor(private cartService: CartService, private toastr: ToastrService) { }

  createPaymentIntent() {
    this.cartService.createPaymentIntent().subscribe({
      next: () => {
        this.toastr.success('Intenlção de pagamento criada com sucesso!');
        this.appStepper?.next();
      },
      error: error => {
        this.toastr.error(error.message);
      }
    });
  }
}
