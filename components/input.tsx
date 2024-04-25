"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search } from "lucide-react";
import { ReactNode, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  onTogglePassword?: () => void;
  className?: string;
  onSearch?: () => void;
  isSearch?: boolean;
}

export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  onTogglePassword,
  className,
  onSearch,
  isSearch,
  ...props
}: InputProps) => {
  const [showPassword, setshowPassword] = useState(false);

  const toggleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-80 items-center justify-between gap-4 rounded border border-slate-300 p-3 text-sm text-slate-500 transition-all duration-200 ease-in focus-within:border-blue-500 focus-within:text-blue-500",
        className
      )}
    >
      {/* Search Button */}
      {isSearch && (
        <span className="cursor-pointer" onClick={onSearch}>
          <Search size={18} />
        </span>
      )}
      {/* Icon */}
      {icon}
      {/* Input */}
      <input
        className="w-full border-none bg-transparent text-sm font-medium text-slate-900 outline-none transition-all duration-200 ease-in placeholder:font-medium placeholder:text-slate-500 focus:outline-none"
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        {...props}
      />
      {/* Show/Hide Password */}
      {type === "password" && (
        <span
          onClick={toggleShowPassword}
          className="cursor-pointer select-none"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      )}
    </div>
  );
};
