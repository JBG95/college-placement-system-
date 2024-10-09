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

// types.ts

export enum ApplicationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Declined = "Declined",
}

export interface Application {
  Job: any;
  id: string;
  fullname: string;
  email: string;
  phone: string;
  status: ApplicationStatus;
  coverLetter?: string;
  resumeUrl: string;
  experience: string;
  education: string;
  appliedAt: Date;
  userId: string;
  jobId: string;
}

export interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  password: string;
  location: string;
  avatarUrl: string;
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
  requirements: String[];
  salaryRange: String;
  listing: ListingType;
  status: Status;
  type: JobType;
  work: WorkType;
  location: String;
  deadline: String;
  userId: String;
  Company: Company;
  user: User;
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
  application: Application[];
  User?: User;
}
