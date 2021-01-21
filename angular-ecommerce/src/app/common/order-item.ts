import { CartItem } from "./cart-item";

export class OrderItem {
  imageUrl: string;
  quantity: number;
  unitPrice: number;
  productId: number;

  constructor(
    imageUrl: string,
    quantity: number,
    unitPrice: number,
    productId: number
  ) {
    this.imageUrl = imageUrl;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.productId = productId;
  }
}
