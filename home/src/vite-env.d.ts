/// <reference types="vite/client" />

interface Position {
  latitude: number | null;
  longitude: number | null;
}

// Props Interfaces
interface ImageCardProps {
  imageURL: string;
  title: string;
  location: string;
  type: string;
}

// Other Interfaces
interface SignedInUser {
  accessToken: string;
  accessTokenExpired: Date;
  refreshToken: string;
  refreshTokenExpired: Date;
  expired: Date;
  avatar: string;
  displayName: string;
  email: string;
  gender: boolean;
  phone: string;
  birthDate: Date;
  address: string;
}
