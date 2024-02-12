export interface User {
  email: string;
  displayName: string;
  roles: string[];
  token: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}
