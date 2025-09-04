export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  isLiked?: boolean;
}

export interface NewProduct {
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}