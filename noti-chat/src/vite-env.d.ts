/// <reference types="vite/client" />

// Props Interface
interface MessageProps {
  message: Message;
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

interface ChatBoxProps {
  signedInUser: SignedInUser;
  chatSections: ChatSection[];
}
interface ChatSectionProps {
  signedInUser: SignedInUser;
  chatSection: ChatSection;
}

// Other Interfaces
interface SignedInUser {
  id: number;
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

interface Conversation {
  conversationId: number;
  userId: number;
  avatar: string;
  userName: string;
  lastMessage: string;
  lastTime: Date;
  unreadCount: number;
}
interface Message {
  id: number;
  isRead: boolean;
  isEdited: boolean;
  message: string;
  createdDate: Date;
  updatedDate: Date;
}
interface ClusMessage {
  id: number;
  senderId: number;
  messages: Message[];
  createdDate: Date;
  updatedDate: Date;
}
interface ChatSection {
  id: number;
  clusMessages: ClusMessage[];
  createdDate: Date;
  updatedDate: Date;
}
