import React, { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon, FileIcon, Image, XIcon } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import api from "@/lib//api";

function ProductImageUpload({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
    setImageLoadingState,
    imageLoadingState,
    isEditMode,
    isCustomStyling = false,
}) {
    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setImageFile(selectedFile);
        }
    }
    function handleDragOver(event) {
        event.preventDefault();
        // event.stopPropagation();
    }
    function handleDrop(event) {
        event.preventDefault();
        const droppedfile = event.dataTransfer.files?.[0];
        if (droppedfile) setImageFile(droppedfile);
    }
    function handleRemoveImage() {
        setImageFile(null);
        setUploadedImageUrl("");
        if (inputRef.current) {
            inputRef.current.value = ""; // Clear the file input
        }
    }
    async function uploadImageToServer() {
        try {
            setImageLoadingState(true);

            const formData = new FormData();
            formData.append("my_file", imageFile);

            const { data } = await api.post(
                "/admin/products/upload-image",
                formData
            );
            console.log("Image upload response:", data);

            if (data?.success) {
                setUploadedImageUrl(data.result.secure_url);
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            // Optionally show a toast or error message here
        } finally {
            setImageLoadingState(false);
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToServer();
    }, [imageFile]);

    return (
        <div
            className={` ${
                isCustomStyling
                    ? "mx-auto w-[90%] "
                    : "max-w-md mx-auto w-full "
            } `}>
            <Label className="text-lg font-semibold mb-2 ml-4 italic block">
                Upload Image
            </Label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={` ${
                    isEditMode ? "opacity-30" : ""
                } border-2 border-dashed border-gray-300 rounded-lg p-4 ml-5 mr-5`}>
                <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                    disabled={isEditMode}></Input>
                {!imageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className={` flex flex-col items-center justify-center h-32 ${
                            isEditMode ? "cursor-not-allowed" : "cursor-pointer"
                        }`}>
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & drop or click to upload image</span>
                    </Label>
                ) : imageLoadingState ? (
                    <Skeleton className="h-10 bg-gray-400" />
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Image
                                className="w-8  h-8 mr-2
                             text-blue-500 "></Image>
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-red-500"
                            onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductImageUpload;
