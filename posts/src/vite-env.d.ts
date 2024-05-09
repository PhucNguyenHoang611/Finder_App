/// <reference types="vite/client" />

interface ImageUploaderProps {
  images: never[];
  setImages: React.Dispatch<React.SetStateAction<never[]>>;
}

interface PreviewPostDialogProps {
  openPreviewDialog: boolean;
  setOpenPreviewDialog: React.Dispatch<React.SetStateAction<boolean>>;
}