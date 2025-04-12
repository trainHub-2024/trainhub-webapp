import { Models } from "node-appwrite";

export interface User extends Models.Document {
  username: string;
  email: string;
  avatar: any;
  account_id: string;
  role: string;
  isOnboarded: boolean;
}

export interface Sport extends Models.Document {
  name: string;
}

export interface Rating extends Models.Document {
  user_id: string;
  trainer_id: string;
  rating: number;
  appointment_id: string;
}

export type AppointmentStatus =
  | "completed"
  | "pending"
  | "cancelled"
  | "confirmed";

export interface Appointment extends Models.Document {
  date: Date;
  price: number;
  status: AppointmentStatus;
  notes: string;
  userProfile_id: string;
  trainerProfile_id: string;

  paymentDate: Date;
  paymentImage: any;
  paymentMethod: "online" | "cash";
  isConfirmedPayment: boolean;
  isPenalized: boolean;

  userProfile: UserProfile;
  trainerProfile: UserProfile;

  rating?: Rating;
}

export interface TrainerProfile extends Models.Document {
  contactNumber: string;
  gender: string;
  location: any;
  dob: Date;
  bio: string;
  isCertified: boolean;
  workDays: string[];
  startTime: Date;
  endTime: Date;
  trainingPrice: number;
  name: string;
  user_id: string;
  score: number;

  appointments: Appointment[];

  ratings: any[];
  totalRating: number;
  averageRating: number;
  certification: any;
  qrCodePayment: any;
  isDisabled: boolean;

  sports: Sport[];
  sports_id: string[];
}

export interface UserProfile extends Models.Document {
  contactNumber: string;
  gender: string;
  location: any;
  dob: Date;

  appointments: any[];

  name: string;
  user_id: string;
  score: number;

  ratings: Rating[];
}

export type AdminRequestStatus = "pending" | "denied" | "completed";

export interface AdminRequest extends Models.Document {
  trainerProfile_id: string;
  type: "certification" | "report" | "appeal" | "sport";
  certification: any;
  text: string;
  status: AdminRequestStatus;

  trainerProfile: TrainerProfile;
}
