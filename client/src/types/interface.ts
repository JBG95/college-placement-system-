export enum Role {
  Creator = "Creator",
  User = "User",
  Admin = "Admin",
}

export interface User {
  id: string;
  username: string;
  fullname: string;
  email: String;
  phone: String;
  password: String;
  location: String;
  avatarUrl: String;
  role: Role;
  emailVerified: Boolean | null;
  phoneVerified: Boolean | null;
  privateProfile: Boolean | null;
  refreshToken: string | null;
}
