import { ChangeEventHandler } from "react";
import clsx from "clsx";

interface TextInputInterface {
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const TextInput = ({
  onChange,
  className,
  placeholder,
}: TextInputInterface) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={clsx("h-10 w-full border border-gray-500 px-5", className)}
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};
