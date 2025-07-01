import React, { useState } from "react";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addBannerImage } from "@/store/common-slice";

function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);

    const dispatch = useDispatch();

    function handleUploadBannerImage() {
        dispatch(
            addBannerImage(uploadedImageUrl).then((data) => {
                console.log(data);
            })
        );
    }

    return (
        <div>
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
                isCustomStyling={true}

                // isEditMode={currentEditedId !== null}
            />
            <Button
                onClick={handleUploadBannerImage}
                className="mt-5 mx-auto w-[88%] h-10 rounded-3xl	 ">
                Upload
            </Button>
        </div>
    );
}

export default AdminDashboard;
