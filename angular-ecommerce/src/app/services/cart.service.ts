import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';
import { templateJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { 
    this.cartItems = JSON.parse(sessionStorage.getItem('cartItems')) != null ? JSON.parse(sessionStorage.getItem('cartItems')):[];
  }

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let itemExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;


    existingCartItem = this.cartItems.find(tempCartItem => theCartItem.id === tempCartItem.id)
    itemExistsInCart = (existingCartItem != undefined);

    if (itemExistsInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue, totalQuantityValue);
   // this.persistCartItems();
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempItem of this.cartItems){
      const subTotalPrice = tempItem.unitPrice * tempItem.quantity;
      console.log(`name:${tempItem.name}, price:${tempItem.unitPrice}, quantity:${tempItem.quantity}, subTotalPrice:${subTotalPrice}`);
    }
    console.log(`totalPrice:${totalPriceValue.toFixed(2)}, totalQuantity:${totalQuantityValue}`);
    console.log('------------')
  }
  persistCartItems(){
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  removeFromCart(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0){
      this.remove(cartItem);
    }
    else{
      this.computeCartTotals();
    }
  }
  remove(cartItem: CartItem){
    const index = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
    if (index > -1){
      this.cartItems.splice(index, 1);
      console.log("aaaaaaaa")
      this.computeCartTotals();
    }
  }
}
