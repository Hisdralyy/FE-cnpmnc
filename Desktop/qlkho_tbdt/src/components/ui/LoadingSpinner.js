import React from 'react';
import { cn } from '@/lib/utils'; // Đảm bảo đường dẫn chính xác tới thư viện utils của bạn

const LoadingSpinner = ({
  size = 50, // Kích thước mặc định
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)} // Sử dụng class spin từ Tailwind CSS
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export default LoadingSpinner;
