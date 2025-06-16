import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";



const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {

  const[formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();



  function onSubmit(event){
    event.preventDefault();
    const submittingToast = toast.loading("Logging in...");

    dispatch(loginUser(formData))
      .then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          toast.dismiss(submittingToast); // remove the loading toast
          toast.success(data?.payload?.message || "Login successful!");

        } else {
          toast.dismiss(submittingToast); // remove the loading toast
          toast.error(data?.payload?.message || "Login failed!");
        }
        return data;
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.dismiss(submittingToast); // remove the loading toast
        toast.error("An error occurred during login.");
      });
  }

    return (
        <div className="mx-auto w-full max-m-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground ">
                    Login to your account
                    <p className="mt-2 text-sm text-muted-foreground cursor-pointer">
                        Don't have an account?
                        <Link
                            className=" ml-2 text-primary hover:underline text-sm"
                            to="/auth/register">
                            Sign Up
                        </Link>
                    </p>
                </h1>
            </div>
            <CommonForm
            formControls={loginFormControls}
            buttonText={"Sign In"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthLogin;
