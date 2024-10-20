import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Register = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-purple-800 p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Đăng ký</h1>
        <form>
          <div className="mb-4">
            <Input type="text" placeholder="Tên công ty" required className="w-full" />
          </div>
          <div className="mb-4">
            <Input type="text" placeholder="Người liên hệ" required className="w-full" />
          </div>
          <div className="mb-4">
            <Input type="tel" placeholder="Số điện thoại" required className="w-full" />
          </div>
          <div className="mb-4">
            <Input type="email" placeholder="Email" required className="w-full" />
          </div>
          <div className="mb-6">
            <Input type="password" placeholder="Mật khẩu" required className="w-full" />
          </div>
          <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
            Đăng ký ngay
          </Button>
        </form>
        <p className="mt-4 text-center">
          Đã có tài khoản? <a href="/login" className="text-purple-300 hover:underline">Đăng nhập</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;