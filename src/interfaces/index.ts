export interface ProductType {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
    quantity: number;
    price: number;
}
