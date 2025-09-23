import React from 'react';
import { Card as NextUICard, CardProps as NextUICardProps } from "@heroui/react";

// Extended interface to maintain compatibility
interface CardProps extends NextUICardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <NextUICard
      className={`hover:shadow-lg transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </NextUICard>
  );
};

export default Card;