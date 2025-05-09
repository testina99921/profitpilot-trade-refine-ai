
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", glow = false, fullWidth = false, children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none";
    
    const variantClasses = {
      primary: "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700",
      secondary: "bg-gradient-to-r from-bluetint-500 to-bluetint-600 text-white hover:from-bluetint-600 hover:to-bluetint-700",
      outline: "border-2 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20",
      ghost: "text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
    };
    
    const sizeClasses = {
      sm: "py-1 px-3 text-sm",
      md: "py-2 px-5 text-base",
      lg: "py-3 px-8 text-lg",
    };
    
    const glowClass = glow ? "glow-effect" : "";
    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          glowClass,
          widthClass,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
