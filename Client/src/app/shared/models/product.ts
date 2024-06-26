import { ProductSize } from "./productSize";

export interface Product {
  id:           number;
  name:         string;
  description:  string;
  price:        number;
  pictureUrl:   string;
  aditionalPicturesUrls: string[];
  weight: number;
  productSizes: ProductSize[];
  productUnit: string;
  productType:  string;
  productBrand: string;
}
