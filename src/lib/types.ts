export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  stock: number;
  image: string;
  images: string[];
  features: string[];
  specs: { [key: string]: string };
  warranty: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}
