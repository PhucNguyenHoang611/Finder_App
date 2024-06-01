/// <reference types="vite/client" />

// Props Interface
interface MessageProps {
  message: string;
}

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalNotifications: number;
  onPageChange: (page: number) => void;
}

interface NotificationListProps {
  signedInUser: SignedInUser;
  isLoading: boolean;
  notifications: INotification[];
  selectedNotifications: number[];
  setSelectedNotifications: React.Dispatch<React.SetStateAction<number[]>>;
}
interface NotificationCardProps {
  signedInUser: SignedInUser;
  notification: INotification;
  selectedNotifications: number[];
  setSelectedNotifications: React.Dispatch<React.SetStateAction<number[]>>;
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

interface CommentNotification {
  id: number;
  commentId: number;
  content: string;
  isRead: boolean;
  parentCommentId: number;
  postId: number;
  postTitle: string;
  senderAvatar: string;
  senderId: number;
  senderName: string;
  timestamp: Date;
  type: string;
}
interface PostNotification {
  id: number;
  approved: string;
  isRead: boolean;
  postId: number;
  postTitle: string;
  timestamp: Date;
  type: string;
}
type INotification = CommentNotification | PostNotification;
