export interface Role {
  id: string;
  name: string;
  normalizedName: string;
  concurrencyStamp: string;
}

export interface UpdateRole {
  roleToBeChanged: string;
  updatedRole: string;
}
