declare module "*.jpg" {
  const content: ImageData;
  export default content;
}
declare module "*.png" {
  const content: ImageData;
  export default content;
}

declare module "*.ttf";

declare type CanvasItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  imageUrls: string[];
  quantity: number ;
  totalPrice: number;
  type: string
};