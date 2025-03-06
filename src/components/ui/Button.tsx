import { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
