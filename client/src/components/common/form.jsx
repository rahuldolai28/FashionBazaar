import React from "react";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

const commonStyle =
    "appearance-none border border-gray-300 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black p-2 rounded w-full";

function CommonForm({
    formControls,
    formData,
    setFormData,
    onSubmit,
    buttonText,
    isBtnDisabled,
}) {
    function renderInputsByComponentType(getControlItem) {
        let element = null;

        const value = formData[getControlItem.name] || "";

        switch (getControlItem.componentType) {
            case "input":
                element = (
                    <Input
                        type={getControlItem.type}
                        name={getControlItem.name}
                        id={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        required={getControlItem.required}
                        className={commonStyle}
                        value={value}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                [getControlItem.name]: e.target.value,
                            }))
                        }
                        onBlur={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                [getControlItem.name]: e.target.value,
                            }))
                        }
                    />
                );
                break;

            case "textarea":
                element = (
                    <Textarea
                        name={getControlItem.name}
                        id={getControlItem.id}
                        placeholder={getControlItem.placeholder}
                        value={value}
                        className={commonStyle}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                [getControlItem.name]: e.target.value,
                            }))
                        }
                    />
                );

                break;

            case "select":
                element = (
                    <Select
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                [getControlItem.name]: value,
                            })
                        }
                        value={value}>
                        <SelectTrigger className="border border-gray-300 text-black p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
                            <SelectValue
                                placeholder={getControlItem.placeholder}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options &&
                            getControlItem.options.length > 0 ? (
                                getControlItem.options.map((option) => (
                                    <SelectItem
                                        key={option.id}
                                        value={option.id}>
                                        {option.label}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="">
                                    No options available
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                );

                break;

            default:
                element = (
                    <Input
                        type={getControlItem.type}
                        name={getControlItem.name}
                        id={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        required={getControlItem.required}
                        // className=" border rounded p-2"
                        className={commonStyle}
                        value={value}
                        onChange={(e) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                [getControlItem.name]: e.target.value,
                            }))
                        }
                    />
                );
                break;
        }
        return element;
    }

    return (
        <form onSubmit={onSubmit} className="px-5">
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem) => (
                    <div
                        className="grid w-full gap-1.5 mb-1"
                        key={controlItem.name}>
                        <Label className="  text-base ">
                            {controlItem.label}
                        </Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>

            <Button
                type="submit"
                className={` mt-4   w-full  px-5 py-2  text-white rounded  ${
                    isBtnDisabled ? "cursor-not-allowed" : "cursor-pointer"
                } `}
                disabled={isBtnDisabled}>
                {buttonText || "Submit"}
            </Button>
        </form>
    );
}

export default CommonForm;
