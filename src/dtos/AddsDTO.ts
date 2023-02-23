export type PaymentOptions = 'boleto' | 'pix' | 'cash' | 'card' | 'deposit';  

export type NewProductAddDTO = {
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: PaymentOptions[]
}