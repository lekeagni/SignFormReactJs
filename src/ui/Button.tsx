import type React from "react";

export interface ButtonProps {
    label?: string;
    variant: "primary" | "info" | "secondary" | "danger";
    onClick?: () => void;
    type?: "submit" | "button"
}

export const Button: React.FC<ButtonProps> = ({
    label,
    variant = "info",
    onClick,
    type = "submit",

}) => {
    return (
        <button className={`btn ${variant}`} type={type} onClick={onClick}>
        {label}
    </button>
    )
}