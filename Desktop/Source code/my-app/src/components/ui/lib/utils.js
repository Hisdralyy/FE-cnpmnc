import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(...inputs));
}
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  
  export const formatDate = (date) => {
    return new Intl.DateTimeFormat('vi-VN').format(new Date(date));
  };