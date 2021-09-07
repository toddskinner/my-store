export class OrderItem {
    id: number;
    name: string;
    price: number;
    url: string;
    quantity: number;
    subtotal: number;

    constructor(){
        this.id = 0;
        this.name = '';
        this.price = 0;
        this.url = '';
        this.quantity = 0;
        this.subtotal = 0;
    }
}