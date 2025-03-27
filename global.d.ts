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
  imageUrls: string[];
  name: string;
  price: number;
  quantity: number ;
  size: string;
  totalPrice: number;
  type: string
};