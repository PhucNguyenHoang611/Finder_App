/// <reference types="vite/client" />

// Props Interfaces
interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  to: string;
}

interface PostItemCardProps {
  post: PostWithFilter;
  handleDeletePost: (id: number) => Promise<void>;
}

interface PostCardProps {
  signedInUser: SignedInUser;
  post: Post;
}

interface PostCommentsProps {
  signedInUser: SignedInUser;
  postId: number;
}

interface CommentItemProps {
  signedInUser: SignedInUser;
  postId: number;
  comment: Comment;
  level: number;
}

interface PostDetailsProps {
  post: PostWithFilter;
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

interface PostImage {
  fileName: string;
  filePath: string;
}
interface ItemType {
  id: number;
  name: string;
}
interface Post {
  id: number;
  title: string;
  location: string;
  postType: string;
  description: string;
  contactPhone: string;
  locationDetail: string;
  authorId: number;
  authorAvatar: string;
  authorDisplayName: string;
  images: PostImage[];
  itemTypes: ItemType[];
  createdDate: Date;
  updatedDate: Date;
  viewCount: number;
  totalComments: number;
}
interface PostWithFilter {
  id: number;
  title: string;
  postType: string;
  location: string;
  locationDetail: string;
  description: string;
  approved: string;
  viewCount: number;
  totalComments: number;
  fileName: string;
  filePath: string;
  createdDate: Date;
  updatedDate: Date;
}

interface Comment {
  id: number;
  parentCommentId: number;
  postId: number;
  senderId: number;
  displayName: string;
  avatar: string;
  isEdited: boolean;
  content: string;
  createdDate: Date;
  updatedDate: Date;
  subComments: Comment[];
}
