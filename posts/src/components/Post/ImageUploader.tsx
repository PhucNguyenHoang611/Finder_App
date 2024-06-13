/* eslint-disable @typescript-eslint/no-explicit-any */
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ChangeEvent, DragEvent } from "react";

export default function ImageUploader({
  selectedFile,
  setSelectedFile
}: ImageUploaderProps) {
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFile([...selectedFile, ...files]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setSelectedFile([...selectedFile, ...files]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedFiles = selectedFile.filter((_, i) => i !== index);
    setSelectedFile(updatedFiles);
  };

  return (
    <div className="w-full h-max flex flex-col justify-center items-center my-8 gap-4">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="lg:w-[80%] w-full h-max flex flex-col gap-2 border-2 border-dashed border-gray-300 p-4"
      >
        {selectedFile.length === 0 ? (
          <div className="w-full flex justify-center items-center gap-2 h-[200px]">
            <CloudUploadOutlinedIcon />
            <span className="text-sm font-semibold text-center">
              Kéo thả hình ảnh vào đây hoặc click vào nút bên dưới để chọn hình
              ảnh (Có thể chọn nhiều ảnh)
            </span>
          </div>
        ) : (
          selectedFile.map((file, index) => (
            <div key={index} className="relative w-full mb-4">
              <img
                src={URL.createObjectURL(file)}
                alt={`postImage-${index}`}
                className="w-full h-[400px] object-cover rounded-xl"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                onClick={() => handleDeleteImage(index)}
              >
                <DeleteOutlineOutlinedIcon />
              </button>
            </div>
          ))
        )}
      </div>

      <div
        className={`lg:w-[80%] w-full h-max flex sm:flex-row flex-col ${
          selectedFile.length > 0 ? "justify-between" : "justify-center"
        } items-center gap-4`}
      >
        <input
          type="file"
          multiple
          onChange={handleInputChange}
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="font-medium bg-slate-200 sm:w-auto w-full"
        />
      </div>
    </div>
  );
}
