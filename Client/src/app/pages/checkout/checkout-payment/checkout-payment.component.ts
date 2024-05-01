import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/shared/models/cart';
import { Address } from 'src/app/shared/models/user';
import { NavigationExtras, Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { OrderToCreate } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit{
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCVC') cardCvcElement?: ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  CardNumberComplete: boolean = false;
  CardExpiryComplete: boolean = false;
  CardCvcComplete: boolean = false;
  cardErrors: any;
  loading: boolean = false;

  constructor(private cartService: CartService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router){}

  ngOnInit(){
    loadStripe('pk_test_51Om2WKFYstaow4m6KfJj2wUSpP1bSN3tpmcODZ1VIhUBROorNrCJApeWZOmbelyop5RGgW6OxfRYGp2oenFIg7SN00CDM2mNSQ')
      .then(stripe => {
        this.stripe = stripe;
        const elements = stripe?.elements();
        if(elements){
          this.cardNumber = elements.create('cardNumber');
          this.cardNumber.mount(this.cardNumberElement?.nativeElement);
          this.cardNumber.on('change', (event) => {
            this.CardNumberComplete = event.complete;
            if(event.error){
              this.cardErrors = event.error.message;
            } else {
              this.cardErrors = null;
            }
          });
          this.cardExpiry = elements.create('cardExpiry');
          this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
          this.cardExpiry.on('change', (event) => {
            this.CardExpiryComplete = event.complete;
            if(event.error){
              this.cardErrors = event.error.message;
            } else {
              this.cardErrors = null;
            }
          });
          this.cardCvc = elements.create('cardCvc');
          this.cardCvc.mount(this.cardCvcElement?.nativeElement);
          this.cardCvc.on('change', (event) => {
            this.CardCvcComplete = event.complete;
            if(event.error){
              this.cardErrors = event.error.message;
            } else {
              this.cardErrors = null;
            }
          });

        }

      })
  }


  get paymentFormComplete(){
    return this.checkoutForm?.get('paymentForm')?.valid && this.CardNumberComplete && this.CardExpiryComplete && this.CardCvcComplete;
  }

  async submitOrder(){
    this.loading = true;
    const cart = this.cartService.getCurrentCartValue();

    try {
      const createdOrder = await this.createOrder(cart);
      const paymentResult = await this.confirmPaymentWithStripe(cart);

      if(paymentResult.paymentIntent){
        if(cart){
          this.cartService.deleteCart(cart);
        }
        const navigationExtras: NavigationExtras = {state: createdOrder}
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }

    } catch (error: any) {
      console.log(error);
      this.toastr.error(error.message);
    } finally {
      this.loading = false;
    }

  }

  private confirmPaymentWithStripe(cart: Cart | null) {
    if(!cart) throw new Error('O carrinho é null.');

    const result = this.stripe?.confirmCardPayment(cart.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });

    if(!result) throw new Error('Problemas ao tentar realizar o pagamento com na Stripe.');

    return result;
  }

  private async createOrder(cart: Cart | null) {
    if(!cart) throw new Error('O carrinho é null.');

    const orderToCreate = this.getOrderToCreate(cart);

    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }

  private getOrderToCreate(cart: Cart) : OrderToCreate {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;

    if(!deliveryMethodId || !shipToAddress) throw new Error('O método de entrega ou o endereço de entrega não foram selecionados.');

    return {
      cartId: cart.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }

  }
}
