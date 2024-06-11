export interface Product {
  id: string;
  name: string;
  modelFileName: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
}
