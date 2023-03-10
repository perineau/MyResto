export enum ProductType{
    DESSERT = "dessert", 
    ENTRY = "entry", 
    MAIN = "main", 
    DRINK = "drink"
}

export type Product = {
    id:number,
    name: string,
    type: ProductType,
    price: number,
    image: any,
}

export enum commandStatus{
    SEND="SEND", 
    PREPARE="PREPARE"
}