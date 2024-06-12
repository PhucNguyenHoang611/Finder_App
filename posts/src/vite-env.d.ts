/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

// Props Interface
interface ImageUploaderProps {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}
interface PreviewPostProps {
  author: SignedInUser;
  post: any;
  image: File | null;
  itemTypes: ItemType[];
}

interface PostsListProps {
  isLoading: boolean;
  posts: PostWithFilter[];
}
interface PostItemCardProps {
  post: PostWithFilter;
}
interface PostCardProps {
  post: Post | null;
}
interface CardActionDialogProps {
  postId: number | undefined;
}

interface CommentItemProps {
  postId: number;
  comment: Comment;
  level: number;
  getComments: (load: boolean) => Promise<void>;
}
interface CommentDropdownProps {
  signedInUser: SignedInUser;
  commentId: number;
  getComments: (load: boolean) => Promise<void>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
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
