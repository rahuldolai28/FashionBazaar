import { LayoutDashboard, Container, ShoppingBasket   } from "lucide-react";

export const registerFormControls = [
    {
        name: "username",
        type: "text",
        label: "User Name",
        placeholder: "Enter your user name",
        componentType: "input",
        required: true,
    },
    {
        name: "email",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        componentType: "input",
        required: true,
    },
    {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        required: true,
    },
];

export const loginFormControls = [
    {
        name: "email",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        componentType: "input",
        required: true,
    },
    {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        required: true,
    },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levis", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)",
    },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock", 
    },
];
