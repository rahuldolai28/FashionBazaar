import React, { Fragment, useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { addProductFormElements } from "@/config";
import CommonForm from "@/components/common/form";
import ProductImageUpload from "@/components/admin-view/image-upload";
import {
    addNewProduct,
    deleteProduct,
    editProduct,
    fetchAllProducts,
} from "@/store/admin/products-slice";
import AdminProductTile from "@/components/admin-view/product-tile";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    salePrice: "",
    totalStock: "",
};

function AdminProducts() {
    const [openCreateProductDialog, setOpenCreateProductDialog] =
        useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const { productList } = useSelector((state) => state.adminProducts);
    const [currentEditedId, setCurrentEditedId] = useState(null);

    const dispatch = useDispatch();

    function onSubmitForm(event) {
        event.preventDefault();

        if (imageLoadingState) return;

        currentEditedId !== null
            ? dispatch(
                  editProduct({
                      id: currentEditedId,
                      formData,
                  })
              ).then((data) => {
                  console.log(data, "Edited data");
                  if (data?.payload?.success) {
                      dispatch(fetchAllProducts());
                      toast.success("Product edited successfully");
                      setFormData(initialFormData);
                      setCurrentEditedId(null);
                      setOpenCreateProductDialog(false);
                      setImageFile(null);
                  }
              })
            : dispatch(
                  addNewProduct({
                      ...formData,
                      image: uploadedImageUrl,
                  })
              ).then((data) => {
                  console.log(data, "Product added successfully");
                  if (data?.payload?.success) {
                      // Reset form data after successful submission
                      dispatch(fetchAllProducts()); // Refresh product list
                      setOpenCreateProductDialog(false);
                      toast.success("Product added successfully!");
                      setFormData(initialFormData);
                      setImageFile(null);
                  }
              });

        // console.log("Form submitted with data:", formData, productList);
    }

    function handleDelete(currentId) {
        dispatch(deleteProduct(currentId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                toast.success("Product deleted successfully");
            }
        });
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key] !== "")
            .every((value) => value); // Check if all values are not empty
    }

    useEffect(() => {
        // Fetch products when the component mounts
        dispatch(fetchAllProducts());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="flex justify-end mb-5">
                <Button onClick={() => setOpenCreateProductDialog(true)}>
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {}
                {productList?.data?.length > 0 ? (
                    productList.data.map((productItem) => (
                        <AdminProductTile
                            key={productItem._id}
                            product={productItem}
                            setOpenCreateProductDialog={
                                setOpenCreateProductDialog
                            }
                            setCurrentEditedId={setCurrentEditedId}
                            setFormData={setFormData}
                            handleDelete={handleDelete}
                        />
                    ))
                ) : (
                    <div className="col-span-4 text-center text-gray-500">
                        No products available. Please add a new product.
                    </div>
                )}
            </div>
            <Sheet
                open={openCreateProductDialog}
                onOpenChange={() => {
                    setOpenCreateProductDialog(false);
                    setCurrentEditedId(null);
                    setFormData(initialFormData);
                }}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle className=" text-2xl lg:text-3xl font-extrabold  text-center">
                            {currentEditedId !== null
                                ? "Edit Product"
                                : "Add New Product"}
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        imageLoadingState={imageLoadingState}
                        setImageLoadingState={setImageLoadingState}
                        isEditMode={currentEditedId !== null}
                    />
                    <div className="py-2">
                        <CommonForm
                            formControls={addProductFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={onSubmitForm}
                            isBtnDisabled={!isFormValid()}
                            buttonText={
                                currentEditedId !== null
                                    ? "Edit"
                                    : "Add Product"
                            }></CommonForm>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;
