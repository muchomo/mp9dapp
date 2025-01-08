import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const MusicUpload = ({
  fileURL,
  setFileURL,
  notifySuccess,
  notifyError,
  setLoader,
}) => {
  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: `054753291470d772a9a3`,
            pinata_secret_api_key: `8ec1ac46e3d100ad1ba7511aa84f1eedd5b54e6de47a2f5bf382484a1e45bb9f`,
            "Content-Type": "multipart/form-data",
          },
        });

        const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        setFileURL(url);
        setLoader(false);
        notifySuccess("audio Uploade Successfully");
      } catch (error) {
        setLoader(false);
        notifyError("Unable to upload image to Pinata, check your API key");
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFS(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 500000000000 });
  return (
    <div className="flex h-full max-h-[calc(100vh-64px)] flex-col overflow-hidden">
      <h3 className="c-ddfucX">Select Auido</h3>
      {fileURL ? (
        <audio className="new_full_width_audio" controls>
          <source src={fileURL} type="audio/ogg" />
          <source src={fileURL} type="audio/mpeg" />
          Your browser dose not support the audio tag
        </audio>
      ) : (
        <div {...getRootProps()} className="c-jnBfEb">
          <p>
            Select your Sounds from your collection on the left-hand side to
            move them to this shelf.
          </p>
          <div className="c-cWWxYX">
            {" "}
            <input {...getInputProps()} type="file" accept="image/*" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicUpload;
