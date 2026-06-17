export interface Treatment {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number; // in INR
  category: string;
  iconName: string; // Refers to Lucide icons
}

export interface Booking {
  id: string;
  fullName: string;
  phoneNumber: string;
  serviceId: string; // Matches treatment.id
  date: string;
  time: string;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface Review {
  id: string;
  author: string;
  comment: string;
  rating: number;
  source: string;
  date: string;
}

export interface WellnessPackage {
  id: string;
  name: string;
  price: number;
  badge?: string;
  features: string[];
  treatmentIds?: string[];
}
