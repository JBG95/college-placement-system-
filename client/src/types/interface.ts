export enum Role {
  Creator = "Creator",
  User = "User",
  Admin = "Admin",
}

export enum JobType {
  Internship = "Internship",
  Parttime = "Parttime",
  Permanent = "Permanent",
}

export enum ListingType {
  Company = "Company",
  Personal = "Personal",
}

export enum WorkType {
  Remote = "Remote",
  Onsite = "Onsite",
}

export enum Status {
  Active = "Active",
  Closed = "Closed",
  Settled = "Settled",
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

export interface Job {
  id: string;
  title: String;
  description: String;
  requirements: String;
  salaryRange: String;
  listing: ListingType;
  status: Status;
  type: JobType;
  work: WorkType;
  location: String;
  deadline: String;
  userId: String;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  jobs: Job[];
  User?: User;
}
