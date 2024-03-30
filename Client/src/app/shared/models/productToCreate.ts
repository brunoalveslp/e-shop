import { ProductSize } from "./productSize";

export interface ProductToCreate {
  id:           number;
  name:         string;
  description:  string;
  price:        number;
  pictureUrl:   string;
  aditionalPicturesUrls: string[];
  productSizes: ProductSize[];
  weight: number;
  quantity: number;
  productUnit: number;
  productType: number;
  productBrand: number;
}
