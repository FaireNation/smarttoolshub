import React from 'react';
import { Button as NextUIButton, ButtonProps as NextUIButtonProps } from "@heroui/react";

// Extended interface to maintain compatibility with existing code
interface ButtonProps extends Omit<NextUIButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  isLoading = false,
  children,
  ...props
}) => {
  // Map legacy variants to NextUI variants
  const mapVariant = (v: string) => {
    switch (v) {
      case 'primary':
        return 'solid';
      case 'secondary':
        return 'bordered';
      case 'outline':
        return 'bordered';
      case 'ghost':
        return 'light';
      default:
        return v;
    }
  };

  return (
    <NextUIButton
      variant={mapVariant(variant) as any}
      size={size}
      isLoading={isLoading}
      color="primary"
      {...props}
    >
      {children}
    </NextUIButton>
  );
};

export default Button;