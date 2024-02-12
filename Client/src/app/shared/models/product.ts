export interface Product {
  id:           number;
  name:         string;
  description:  string;
  price:        number;
  pictureUrl:   string;
  aditionalPicturesUrls: string[];
  weight: number;
  quantity: number;
  productUnit: string;
  productType:  string;
  productBrand: string;
}
