import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  X, ShoppingCart, Minus, Plus, Trash2, CheckCircle2,
  Clock, ShieldCheck, Package2, ChevronRight, Calendar,
  Store, CreditCard, MapPin, FileText
} from 'lucide-react';
import { Button } from './ui/button';

const parsePrice = (price) => {
  if (!price || typeof price !== 'string') return 0;
  if (price.includes('NaN')) return 0;
  const numericValue = price.replace(/[^\d]/g, '');
  return numericValue ? parseInt(numericValue, 10) : 0;
};

// định dạng giá thành số vnd 
const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0đ';
  }
  try {
    return price.toLocaleString('vi-VN') + 'đ';
  } catch (error) {
    return '0đ';
  }
};

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const numericPrice = parsePrice(item.price);

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
        <div className="font-medium text-green-600">
          {formatPrice(numericPrice * item.quantity)}
        </div>
        <div className="text-sm text-gray-500">
          {formatPrice(numericPrice)}/sp
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

// hàm tính tổng 
const CartSummary = ({ cartTotal, shipping = 0 }) => (
  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Tổng tiền hàng</span>
      <span className="font-medium">{formatPrice(cartTotal)}</span>
    </div>
    <div className="pt-2 border-t">
      <div className="flex justify-between text-lg font-bold">
        <span className="text-green-600">Tổng cộng</span>
        <span className="text-green-600">{formatPrice(cartTotal + shipping)}</span>
      </div>
    </div>
  </div>
);

// xác nhận đơn hàng thành công của đại lý 
const OrderConfirmationModal = ({ isOpen, onClose, orderDetails }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };
  
  const handleViewDetails = () => {
    setShowDetails(true);
  };
// form xem chi tiết đơn hàng 
  const OrderDetailsView = () => {
    return (
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed left-1/2 top-1 -translate-x-1/2  z-50  mx-auto px-6 max-h-96"

          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                <div className="flex justify-between items-center text-white">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Chi Tiết Đơn Hàng</h2>
                    <p className="text-green-50">#{orderDetails?.orderId || 'ORD123456789'}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                      <p className="text-sm text-green-50">Tổng giá trị</p>
                      <p className="text-xl font-bold">{formatPrice(orderDetails?.total || 5000000)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Order Status Timeline */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    Trạng thái đơn hàng
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <p className="font-medium">Đã xác nhận</p>
                      <p className="text-gray-500">10:30 AM</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
                        <Package2 className="w-4 h-4" />
                      </div>
                      <p className="font-medium">Đang xử lý</p>
                      <p className="text-gray-500">11:00 AM</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <div className="flex flex-col items-center opacity-40">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white mb-2">
                        <FileText className="w-4 h-4" />
                      </div>
                      <p className="font-medium">Hoàn thành</p>
                      <p className="text-gray-500">--:--</p>
                    </div>
                  </div>
                </div>

                {/* Order Info Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Thông tin cơ bản</h3>
                    <div className="bg-white rounded-xl border p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Ngày đặt hàng</p>
                          <p className="font-medium">{new Date().toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Store className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Đại lý</p>
                          <p className="font-medium">Công ty TNHH ABC</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Phương thức thanh toán</p>
                          <p className="font-medium">Chuyển khoản ngân hàng</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Thông tin giao hàng</h3>
                    <div className="bg-white rounded-xl border p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Địa chỉ giao hàng</p>
                          <p className="font-medium">123 Đường ABC, Phường XYZ, Quận 1, TP.HCM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Package2 className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Phương thức vận chuyển</p>
                          <p className="font-medium">Giao hàng nhanh</p>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Items */} 
                {/* <div className="space-y-4">
                  <h3 className="font-semibold">Chi tiết sản phẩm</h3>
                  <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sản phẩm</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Số lượng</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Đơn giá</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {orderDetails?.items?.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">{item.quantity}</td>
                            <td className="px-4 py-3 text-right">{formatPrice(item.price)}</td>
                            <td className="px-4 py-3 text-right">{formatPrice(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan="3" className="px-4 py-3 text-right font-medium">Tạm tính:</td>
                          <td className="px-4 py-3 text-right font-medium">{formatPrice(orderDetails?.subtotal || 0)}</td>
                        </tr>
                        <tr>
                          <td colSpan="3" className="px-4 py-3 text-right font-medium">Phí vận chuyển:</td>
                          <td className="px-4 py-3 text-right font-medium">{formatPrice(orderDetails?.shipping || 0)}</td>
                        </tr>
                        <tr className="border-t">
                          <td colSpan="3" className="px-4 py-3 text-right font-medium">Tổng cộng:</td>
                          <td className="px-4 py-3 text-right font-bold text-green-600">{formatPrice(orderDetails?.total || 0)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div> */}
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Đóng
                  </button>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                    Xuất PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed left-1/2 top-24 -translate-x-1/2 z-50 w-full max-w-lg mx-auto px-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative w-full max-w-lg mx-auto px-4 pt-8 pb-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white" />
                  <div className="absolute -right-20 -top-20 w-60 h-60 bg-green-100/50 rounded-full" />
                  <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-emerald-50/50 rounded-full" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>

                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Xác nhận đơn hàng thành công!
                    </h2>
                    <p className="text-gray-600">
                      Cảm ơn Đại lý đã đặt hàng. Đơn hàng đã được xác nhận và đang được xử lý.
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 mb-8 border border-green-100">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Mã đơn hàng:</span>
                        <span className="font-medium text-green-600">
                          {orderDetails?.orderId || '#' + Math.random().toString(36).substr(2, 9)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tổng giá trị:</span>
                        <span className="font-medium text-green-600">
                          {formatPrice(orderDetails?.total || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Thời gian:</span>
                        <span className="font-medium">
                          {new Date().toLocaleString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium"
                      onClick={onClose}
                    >
                      Đóng
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 border-green-600 text-green-600 hover:bg-green-50 font-medium"
                      onClick={handleViewDetails}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Render component chi tiết đơn hàng */}
      <OrderDetailsView />
    </>
  );
};

const CartAndCheckout = ({ cart = [], setCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

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
      // Lưu giỏ hàng vào localStorage trước khi chuyển hướng
      localStorage.setItem('pendingCart', JSON.stringify(cart));
      navigate('/login?redirect=checkout');
      return;
    }
    
    // Xử lý xác nhận đơn hàng cho người dùng đã đăng nhập
    setIsCartOpen(false);
    setShowOrderConfirmation(true);
  };

  const handleOrderConfirmationClose = () => {
    setShowOrderConfirmation(false);
    setCart([]); // Xóa giỏ hàng sau khi đặt hàng thành công
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
                    className={`w-full h-11 ${
                      isAuthenticated 
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-600 hover:bg-gray-700'
                    } text-white`}
                    onClick={handleCheckoutClick}
                  >
                    {isAuthenticated ? 'Xác nhận đơn hàng' : 'Đăng nhập để xác nhận đơn hàng'}
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
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </Button>

      <CartDrawer />

      <OrderConfirmationModal
        isOpen={showOrderConfirmation}
        onClose={handleOrderConfirmationClose}
        orderDetails={{
          orderId: 'DH' + Date.now(),
          total: cartTotal,
        }}
        
      />
    </>
  );
};

export default CartAndCheckout;