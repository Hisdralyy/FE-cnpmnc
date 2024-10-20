import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '@faststore/ui';
import { 
  X, ShoppingCart, CreditCard, Truck, Check,
  coins, landmark, ArrowRight, ChevronLeft
} from 'lucide-react';
import { 
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const CartAndCheckout = ({ cart, setCart, cartTotal, isAuthenticated }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  // Xử lý khi người dùng click vào nút thanh toán
  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      localStorage.setItem('pendingCart', JSON.stringify(cart));
      navigate('/login?redirect=checkout');
      return;
    }
    setCheckoutStep(1);
  };

  // Component giỏ hàng - Đã được di chuyển lên trên
  const CartDrawer = () => (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold text-purple-800">Giỏ hàng của bạn</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-grow overflow-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Tổng cộng:</span>
                    <span className="text-xl font-bold text-purple-600">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handleCheckoutClick}
                  >
                    Tiến hành thanh toán
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Xử lý khi người dùng gửi form địa chỉ giao hàng
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.phone || 
        !shippingAddress.address || !shippingAddress.city || 
        !shippingAddress.district || !shippingAddress.ward) {
      return;
    }
    setCheckoutStep(2);
  };

  // Component form địa chỉ giao hàng
  const ShippingAddressForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-800">
            Địa chỉ giao hàng
          </CardTitle>
          <CardDescription>
            Vui lòng điền đầy đủ thông tin để chúng tôi giao hàng đến bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input 
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      fullName: e.target.value
                    })}
                    placeholder="Nguyễn Văn A"
                  />
                </FormControl>
              </FormField>

              <FormField>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input 
                    required
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      phone: e.target.value
                    })}
                    placeholder="0912345678"
                  />
                </FormControl>
              </FormField>
            </div>

            <FormField>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input 
                  required
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value
                  })}
                  placeholder="Số nhà, tên đường"
                />
              </FormControl>
            </FormField>

            <div className="grid grid-cols-3 gap-4">
              <FormField>
                <FormLabel>Tỉnh/Thành phố</FormLabel>
                <FormControl>
                  <Input 
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value
                    })}
                  />
                </FormControl>
              </FormField>

              <FormField>
                <FormLabel>Quận/Huyện</FormLabel>
                <FormControl>
                  <Input 
                    required
                    value={shippingAddress.district}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      district: e.target.value
                    })}
                  />
                </FormControl>
              </FormField>

              <FormField>
                <FormLabel>Phường/Xã</FormLabel>
                <FormControl>
                  <Input 
                    required
                    value={shippingAddress.ward}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      ward: e.target.value
                    })}
                  />
                </FormControl>
              </FormField>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCheckoutStep(0)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay lại
          </Button>
          <Button 
            onClick={handleShippingSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
          >
            Tiếp tục
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  // Component chọn phương thức thanh toán
  const PaymentMethodForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-800">
            Phương thức thanh toán
          </CardTitle>
          <CardDescription>
            Chọn phương thức thanh toán phù hợp với bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-purple-50 cursor-pointer">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                <coins className="w-5 h-5 text-purple-600" />
                Thanh toán khi nhận hàng (COD)
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-purple-50 cursor-pointer">
              <RadioGroupItem value="landmark" id="landmark" />
              <Label htmlFor="landmark" className="flex items-center gap-2 cursor-pointer">
                <landmark className="w-5 h-5 text-purple-600" />
                Chuyển khoản ngân hàng
              </Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-purple-50 cursor-pointer">
              <RadioGroupItem value="credit" id="credit" />
              <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Thẻ tín dụng/Ghi nợ
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCheckoutStep(1)}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay lại
          </Button>
          <Button 
            disabled={!paymentMethod}
            onClick={() => {
              console.log('Processing payment...');
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
          >
            Hoàn tất đặt hàng
            <Check className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  // Render chính
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

      <AnimatePresence>
        {checkoutStep > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            {checkoutStep === 1 && <ShippingAddressForm />}
            {checkoutStep === 2 && <PaymentMethodForm />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartAndCheckout;