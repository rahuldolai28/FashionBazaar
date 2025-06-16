import React from "react";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
    formControls,
    formData,
    setFormData,
    onSubmit,
    buttonText,
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
                        className="border rounded p-2"
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
                    <Select onValueChange={(value)=> setFormData({
                        ...formData,
                        [getControlItem.name]: value,
                    })} value={value}  >
                        <SelectTrigger className="w-full">
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
                        className="border rounded p-2"
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
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem) => (
                    <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button
                type="submit"
                className="mt-2 w-full       px-4 py-2  text-white rounded  ">
                {buttonText || "Submit"}
            </Button>
        </form>
    ); 
}

export default CommonForm;
