import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

const Upload = ({ user }) => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const uploadComplete = () => {
    setFiles([]);
    // navigate("/dashboard");
  };

  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        maxFiles={1}
        allowRevert={false}
        server={{
          url: "http://localhost:3000",
          process: {
            url: "/api/upload",
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
            ondata: (formData) => {
              formData.append("folder", "default");
              formData.append("status", "private");
              return formData;
            },
            onerror: (response) => {
              return response.data;
            },
            onload: (response) => response.key,
          },
        }}
        name="image"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        allowFileSizeValidation={true}
        maxFileSize="5MB"
        allowFileTypeValidation={true}
        acceptedFileTypes={["image/png", "image/jpeg"]}
        onprocessfile={uploadComplete} //show success, empty file and redirect
      />
    </div>
  );
};

export default Upload;
