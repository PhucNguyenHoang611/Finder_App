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
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full h-max flex flex-col justify-center items-center my-8 gap-4">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="lg:w-[80%] w-full h-max flex flex-col gap-2"
      >
        {selectedFile === null ? (
          <div className="w-full flex justify-center items-center gap-2 h-[200px]">
            <CloudUploadOutlinedIcon />
            <span className="text-sm font-semibold text-center">
              Kéo thả hình ảnh vào đây hoặc click vào nút bên dưới để chọn hình
              ảnh
            </span>
          </div>
        ) : (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="postImage"
            className="w-full h-[500px] object-cover rounded-xl"
          />
        )}
      </div>

      <div
        className={`lg:w-[80%] w-full h-max flex sm:flex-row flex-col ${
          selectedFile ? "justify-between" : "justify-center"
        } items-center gap-4`}
      >
        <input
          type="file"
          onChange={handleInputChange}
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="font-medium bg-slate-200 sm:w-auto w-full"
        />

        {selectedFile !== null && (
          <button
            type="button"
            className="sm:w-auto w-full px-4 py-2 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white flex justify-center items-center gap-2"
            onClick={handleDeleteImage}
          >
            <DeleteOutlineOutlinedIcon />
            Xóa ảnh
          </button>
        )}
      </div>
    </div>
  );
}

// import ImageUploading, { ImageListType } from "react-images-uploading";

// export default function ImageUploader({ images, setImages }: ImageUploaderProps) {
//   const maxNumber = 1;

//   const onChange = (
//     imageList: ImageListType,
//     addUpdateIndex: number[] | undefined
//   ) => {
//     console.log(imageList, addUpdateIndex);
//     setImages(imageList as never[]);
//   };

//   return (
//     <ImageUploading
//       multiple
//       value={images}
//       onChange={onChange}
//       maxNumber={maxNumber}
//     >
//       {({
//         imageList,
//         onImageUpload,
//         onImageUpdate,
//         onImageRemove,
//         isDragging,
//         dragProps,
//         // onImageRemoveAll
//       }) => (
//         <div className="w-full h-max flex justify-center items-center my-8">
//           {imageList.length == 0 && (
//             <button
//               type="button"
//               onClick={onImageUpload}
//               {...dragProps}
//               className={`lg:w-[80%] w-full h-[500px] ${
//                 isDragging ? "bg-slate-200" : "bg-white"
//               } border-2 border-slate-200 rounded-xl flex items-center justify-center gap-2`}
//             >
//               <CloudUploadOutlinedIcon />
//               <p className="text-sm font-semibold">
//                 Click hoặc kéo thả để upload hình ảnh
//               </p>
//             </button>
//           )}

//           {imageList.map((image, index) => (
//             <div
//               key={index}
//               className="lg:w-[80%] w-full h-max flex flex-col gap-2"
//             >
//               <img
//                 src={image.dataURL}
//                 alt="postImage"
//                 className="w-full h-[500px] border-2 border-slate-200 object-cover rounded-xl"
//               />
//               <div className="flex justify-center items-center gap-2">
//                 <button
//                   type="button"
//                   className="w-[20%] h-[40px] rounded-xl font-semibold text-white bg-black"
//                   onClick={() => onImageUpdate(index)}
//                 >
//                   Đổi ảnh
//                 </button>
//                 <button
//                   type="button"
//                   className="w-[20%] h-[40px] rounded-xl font-semibold border-2 border-black text-black"
//                   onClick={() => onImageRemove(index)}
//                 >
//                   Xóa
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* &nbsp;
//           <button
//             type="button"
//             onClick={onImageRemoveAll}
//             className="w-[20%]"
//           >
//             Xóa hình
//           </button> */}
//         </div>
//       )}
//     </ImageUploading>
//   );
// }
