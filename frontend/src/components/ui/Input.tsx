import React from 'react';
import { Input as NextUIInput, InputProps as NextUIInputProps } from "@heroui/react";

// Extended interface to maintain compatibility
interface InputProps extends NextUIInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  variant = 'bordered',
  size = 'md',
  radius = 'md',
  color = 'primary',
  placeholder,
  ...props
}) => {
  // Ensure accessibility: if no label and no aria-label, use placeholder as aria-label
  const accessibilityProps = {
    ...props,
    ...(
      !label &&
        !props['aria-label'] &&
        !props['aria-labelledby'] &&
        placeholder
        ? { 'aria-label': placeholder }
        : {}
    )
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <NextUIInput
        variant={variant}
        size={size}
        radius={radius}
        color={color}
        placeholder={placeholder}
        isInvalid={!!error}
        errorMessage={error}
        description={helperText}
        startContent={icon}
        classNames={{
          base: "w-full",
          mainWrapper: "h-full",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            "focus:outline-none",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-sm",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
            "border-2",
            "border-transparent",
            "group-data-[focused=true]:border-primary",
            "group-data-[invalid=true]:border-danger",
          ],
        }}
        {...accessibilityProps}
      />
    </div>
  );
};

export default Input;