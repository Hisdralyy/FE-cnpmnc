import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/ui/LoadingSpinner'; // Đường dẫn đúng đến component
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng đến WelcomePage

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true); // Bắt đầu loading  

    // Giả lập quá trình kiểm tra đăng nhập
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Thay thế bằng API call thật

    // Giả lập người dùng đăng nhập thành công
    if (formData.email === 'long@gmail.com' && formData.password === '1') {
      setSuccess('Đăng nhập thành công!');
      setIsLoading(false);
      setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập thành công

      // Thêm delay trước khi chuyển hướng
      setTimeout(() => {
        navigate('/WelcomePage'); // Điều hướng đến WelcomePage
      }, 2000);
    } else {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      setIsLoading(false);
    }
  };

  // Giao diện hiệu ứng loading khi đang xử lý đăng nhập
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-center"
        >
          <div className="flex flex-col items-center">
            <LoadingSpinner className="mb-4 text-blue-500" size={50} />
            <p>Đang kiểm tra tài khoản...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Giao diện loading khi đăng nhập thành công
  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }} 
          className="text-center space-y-4"
        >
          {/* Logo với animation */}
          <motion.img 
            src="assets/images/logo.png"
            alt="logo" 
            className="w-20 h-20 mx-auto mb-4" 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1.2, opacity: 1 }} 
            transition={{ duration: 0.5 }}
          />
          
          {/* Text "Đăng nhập thành công!" với animation */}
          <motion.h2
            className="text-3xl font-bold text-green-500"
            initial={{ y: -30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.4 }}
          >
            Đăng nhập thành công!
          </motion.h2>

          {/* Mô tả với animation */}
          <motion.p
            className="text-lg text-gray-700"
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.4, delay: 0.2 }} 
          >
            Chào mừng bạn quay trở lại.
          </motion.p>

          {/* Thanh tiến trình với animation */}
          <motion.div
            initial={{ width: 0 }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 1.5, delay: 0.3 }} 
            className="h-2 bg-green-500 rounded-full"
          />

          {/* Text chuyển đến trang chủ */}
          <motion.p
            className="mt-4 text-sm text-gray-500"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 1 }} 
          >
            Đang chuyển hướng đến trang chủ...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="mail@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 focus:ring-primary focus:border-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>
            </>
          )}
          <Button
            type="submit"
            className="w-full bg-primary text-white rounded-md hover:bg-primary/90"
          >
            {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
          </Button>
          {error && <Alert className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
          {success && <Alert className="mt-4"><AlertDescription>{success}</AlertDescription></Alert>}
        </form>
        <div className="text-center">
          <span className="text-gray-600">
            {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-semibold"
            >
              {isLogin ? 'Đăng Ký' : 'Đăng Nhập'}
            </button>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginRegister;
