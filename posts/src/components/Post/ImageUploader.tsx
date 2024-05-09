/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageUploading, { ImageListType } from "react-images-uploading";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export function ImageUploader({ images, setImages }: ImageUploaderProps) {
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps
        // onImageRemoveAll
      }) => (
        <div className="w-full h-max flex justify-center items-center my-8">
          {imageList.length == 0 && (
            <button
              type="button"
              onClick={onImageUpload}
              {...dragProps}
              className={`lg:w-[80%] w-full h-[500px] ${isDragging ? "bg-slate-200" : "bg-white"} border-2 border-slate-200 rounded-xl flex items-center justify-center gap-2`}
            >
              <CloudUploadOutlinedIcon />
              <p className="text-sm font-semibold">
                Click hoặc kéo thả để upload hình ảnh
              </p>
            </button>
          )}

          {imageList.map((image, index) => (
            <div key={index} className="lg:w-[80%] w-full h-max flex flex-col gap-2">
              <img src={image.dataURL} alt="postImage" className="w-full h-[500px] border-2 border-slate-200 object-cover rounded-xl" />
              <div className="flex justify-center items-center gap-2">
                <button type="button" className="w-[20%] h-[40px] rounded-xl font-semibold text-white bg-black" onClick={() => onImageUpdate(index)}>Đổi ảnh</button>
                <button type="button" className="w-[20%] h-[40px] rounded-xl font-semibold border-2 border-black text-black" onClick={() => onImageRemove(index)}>Xóa</button>
              </div>
            </div>
          ))}

          {/* &nbsp;
          <button
            type="button"
            onClick={onImageRemoveAll}
            className="w-[20%]"
          >
            Xóa hình
          </button> */}
        </div>
      )}
    </ImageUploading>
  );
}