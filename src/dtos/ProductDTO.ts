export type PaymentOptionsKeys = 'boleto' | 'pix' | 'cash' | 'card' | 'deposit';  
export type PaymentOptionsValues = 'Boleto' | 'Pix' | 'Dinhheiro' | 'Cartão de crédito' | 'Depósito';  

export type DatabasePaymentOptions = {
    key: PaymentOptionsKeys,
    name: PaymentOptionsValues
}

export type DatabaseImages = {
    path: string,
    id: string
}

export type DatabaseProductDTO = {
    id: string,
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    user_id: string,
    is_active: boolean,
    created_at: string,
    updated_at: string,
    product_images: DatabaseImages[],
    payment_methods: DatabasePaymentOptions[]
}