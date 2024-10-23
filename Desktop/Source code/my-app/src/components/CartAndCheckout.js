import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  X, ShoppingCart, Minus, Plus, Trash2
} from 'lucide-react';
import { Button } from './ui/button';

// Hàm để chuyển chuỗi giá trị thành số
const parsePrice = (price) => {
  return Number(price.replace(/\./g, '').replace('đ', '').trim());
};

// Hàm để định dạng số thành chuỗi giá có dấu phân cách và ký tự "đ"
const formatPrice = (price) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const numericPrice = parsePrice(item.price); // Chuyển giá về dạng số

  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
      <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={item.image || "/api/placeholder/64/64"} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 truncate">{item.description}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="text-right min-w-[100px]">
        <div className="font-medium text-purple-600">
          {formatPrice(numericPrice * item.quantity)} {/* Tính giá tổng */}
        </div>
        <div className="text-sm text-gray-500">
          {formatPrice(numericPrice)}/sp {/* Giá từng sản phẩm */}
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

const CartSummary = ({ cartTotal, shipping = 0 }) => (
  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Tổng tiền hàng</span>
      <span className="font-medium">{formatPrice(cartTotal)}</span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Phí vận chuyển</span>
      <span className="font-medium">{formatPrice(shipping)}</span>
    </div>
    <div className="pt-2 border-t">
      <div className="flex justify-between text-lg font-bold">
        <span className="text-purple-600">Tổng cộng</span>
        <span className="text-purple-600">{formatPrice(cartTotal + shipping)}</span>
      </div>
    </div>
  </div>
);

const CartAndCheckout = ({ cart = [], setCart, isAuthenticated }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // Tính tổng tiền trong giỏ hàng
  const cartTotal = cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    ).filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      localStorage.setItem('pendingCart', JSON.stringify(cart));
      navigate('/login?redirect=checkout');
      return;
    }
    // Xử lý checkout
  };

  const CartDrawer = () => (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Đơn hàng của bạn</h2>
                  <p className="text-sm text-gray-500">
                    {itemCount} {itemCount === 1 ? 'sản phẩm' : 'sản phẩm'}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 p-4 space-y-2">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Giỏ hàng trống
                    </h3>
                    <p className="text-gray-500">
                      Hãy thêm sản phẩm vào đơn hàng của bạn
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4 space-y-4 bg-white">
                  <CartSummary cartTotal={cartTotal} />
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11"
                    onClick={handleCheckoutClick}
                  >
                    Xác nhận đơn hàng
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </Button>

      <CartDrawer />
    </>
  );
};

export default CartAndCheckout;

