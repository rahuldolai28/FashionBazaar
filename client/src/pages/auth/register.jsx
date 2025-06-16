import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
    username: "",
    email: "",
    password: "",
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSubmit(event) {
        event.preventDefault();
        const submittingToast = toast.loading("Creating account...");
        dispatch(registerUser(formData))
            .then((data) => {
                console.log(data);
                if (data?.payload?.success) {
                    toast.dismiss(submittingToast); // remove the loading toast
                    toast.success(
                        data?.payload?.message || "Registration successful!"
                    );
                    navigate("/auth/login");
                } else {
                    toast.dismiss(submittingToast); // remove the loading toast
                    toast.error(
                        data?.payload?.message || "Registration failed!"
                    );
                }
                 return data; 
            })
            .then((response) => {
                console.log("Registration successful:", response);
                // Handle successful registration, e.g., redirect to login or dashboard
            })
            .catch((error) => {
                console.error("Registration failed:", error);
                // Handle registration error, e.g., show an error message
            });
    }

    console.log(formData);

    return (
        <div className="mx-auto w-full max-m-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground ">
                    Create new account
                    <p className="mt-2 text-sm text-muted-foreground cursor-pointer">
                        Already have an account?
                        <Link
                            className=" ml-2 text-primary hover:underline text-sm"
                            to="/auth/login">
                            Login
                        </Link>
                    </p>
                </h1>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={"Sign Up"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;
