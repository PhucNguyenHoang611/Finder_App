/// <reference types="vite/client" />

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

interface Post {
  id: number;
  title: string;
  postType: string;
  location: string;
  locationDetail: string;
  description: string;
  approved: boolean;
  fileName: string;
  filePath: string;
  createdDate: Date;
  updatedDate: Date;
}

// Props Interfaces
interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  to: string;
}

interface PostItemCardProps {
  post: Post;
}
