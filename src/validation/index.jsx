import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name:Yup.string().min(2).max(25).required("Please Enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    phone: Yup.string().min(10).required("Please enter your phone number"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], "Password must match"),
    category: Yup.string().required("Please select category"),
})

export const loginInSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
})