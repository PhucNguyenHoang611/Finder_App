/// <reference types="vite/client" />

interface ImageCardProps {
  imageURL: string;
  title: string;
  location: string;
  type: string;
}

interface Position {
  latitude: number | null;
  longitude: number | null;
}
