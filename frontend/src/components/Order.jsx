import { useState } from "react";
import { useUploadImagesMutation } from "../api/uploadApi";
import { useDropzone } from "react-dropzone";

const Order = () => {
  const [files, setFiles] = useState([]);
  const [uploadImages, { isLoading }] = useUploadImagesMutation();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await uploadImages(formData).unwrap();
      console.log("Upload Success:", response);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="p-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag & Drop images here or click to upload</p>
      </div>

      <div className="mt-4">
        {files.length > 0 && (
          <div>
            <h3>Selected Images:</h3>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
              onClick={handleUpload}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload Images"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
