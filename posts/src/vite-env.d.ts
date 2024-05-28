/// <reference types="vite/client" />

// Props Interface
interface ImageUploaderProps {
  images: never[];
  setImages: React.Dispatch<React.SetStateAction<never[]>>;
}

interface PreviewPostDialogProps {
  openPreviewDialog: boolean;
  setOpenPreviewDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

// Other Interfaces
interface Post {
  id: number;
  title: string;
  postType: string;
  location: string;
  locationDetail: string;
  description: string;
  approved: boolean;
  viewCount: number;
  totalComments: number;
  fileName: string;
  filePath: string;
  createdDate: Date;
  updatedDate: Date;
}
