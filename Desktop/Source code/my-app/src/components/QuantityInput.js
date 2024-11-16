import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Minus } from "lucide-react";

const QuantityInput = ({ item, onUpdateQuantity }) => {
  const [inputValue, setInputValue] = useState(item.quantity.toString());
  const [isEditing, setIsEditing] = useState(false);

  // Cập nhật inputValue khi item.quantity thay đổi từ bên ngoài
  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  // Xử lý khi người dùng nhập giá trị
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép nhập số
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  // Xử lý khi người dùng nhấn Enter hoặc input mất focus
  const handleSubmit = () => {
    let newValue = parseInt(inputValue) || 0;
    // Đảm bảo giá trị không âm
    newValue = Math.max(0, newValue);
    onUpdateQuantity(item.id, newValue);
    setInputValue(newValue.toString());
    setIsEditing(false);
  };

  // Xử lý khi người dùng nhấn phím
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setInputValue(item.quantity.toString());
      setIsEditing(false);
    }
  };

  // Xử lý tăng giảm số lượng
  const handleIncrement = () => {
    const newValue = item.quantity + 1;
    onUpdateQuantity(item.id, newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, item.quantity - 1);
    onUpdateQuantity(item.id, newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleDecrement}
      >
        <Minus className="w-4 h-4" />
      </Button>

      {isEditing ? (
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="w-16 h-8 text-center p-0"
          autoFocus
        />
      ) : (
        <span
          className="w-8 text-center font-medium cursor-text"
          onClick={() => setIsEditing(true)}
        >
          {item.quantity}
        </span>
      )}

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleIncrement}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantityInput;