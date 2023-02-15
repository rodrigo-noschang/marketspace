type paymentMethods = 'boleti' | 'pix' | 'cash' | 'card' | 'deposit';  

export type ProductsDTO = {
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    payment_methods: paymentMethods[]
}