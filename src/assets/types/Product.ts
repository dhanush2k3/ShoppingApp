export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
  rating: number;
  availabilityStatus: string;
  reviews: Review[];
  brand: string;
}
