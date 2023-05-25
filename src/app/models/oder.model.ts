import { CartItemsModel } from "./cart.model";
import { ShippingModel } from "./shipping.model";

export class OrderModel {
    id?: string;
    userId: string;
    datePlaced: number;
    shppingDetails: ShippingModel = new ShippingModel()
    items: CartItemsModel[] = [];
    amount: number;
}