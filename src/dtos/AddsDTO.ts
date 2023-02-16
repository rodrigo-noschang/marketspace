type PaymentOptions = 'boleti' | 'pix' | 'cash' | 'card' | 'deposit';  

type PaymentMethods = {
    key: PaymentOptions,
    value: PaymentOptions
}

type ProductImage = {
    path: string,
    id: string
}

export type ProductAddDTO = {
    id: string,
    name: string,
    description: string,
    is_new: boolean,
    price: number,
    accept_trade: boolean,
    user_id: string,
    is_active: boolean,
    product_images: ProductImage[],
    payment_methods: PaymentMethods[]
}