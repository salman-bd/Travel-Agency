
interface Author {
  name: string | null;
};
export interface BlogPost {  
  id: string;  
  title: string;  
  slug: string;  
  content: string;  
  excerpt: string;  
  imageUrl: string;  
  published: boolean;  
  author: Author
  authorId: string;  
  category: string;  
  createdAt: Date;  
}  

export interface Destination {  
  id: string;  
  name: string;  
  country: string;  
  description: string;  
  price: number;  
  rating: number;  
  category: string;  
  featured: boolean;  
  imageUrl: string;  
  createdAt: Date;  
  updatedAt: Date;  
}  


interface DestinationName {
  name: string
}

export interface Booking {  
  id: string;  
  userId: string;  
  packageId: string;  
  startDate: Date;  
  endDate: Date;  
  totalPrice: number;  
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';  
  adults: number;  
  children: number;  
  contactEmail: string;  
  contactPhone: string;  
  createdAt: Date;  
  updatedAt: Date;  
  user: {  
    name: string | null;  
    email: string;  
  };  
  package: {  
    title: string;  
    destination: DestinationName;  
  }   
}

export interface Itinerary {
  id?: string
  packageId?: string
  day: number
  title: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Package {
  id: string
  title: string
  description: string
  price: number
  duration: number
  destinationId: string
  imageUrl: string
  inclusions: string[]
  exclusions: string[]
  createdAt: Date
  updatedAt: Date
  destination?: {
    id: string
    name: string
  }
}

export interface PackageWithItinerary extends Package {
  itinerary: Itinerary[]
}

export interface Notification {
  id: string
  userId: string
  type: "BOOKING" | "CONTACT" | "BLOG" | "SYSTEM"
  message: string
  link?: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}
