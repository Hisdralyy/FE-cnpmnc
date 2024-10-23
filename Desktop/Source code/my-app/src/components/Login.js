import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Login = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Đăng nhập</h1>
        <form>
          <div className="mb-4">
            <Input type="email" placeholder="Email" required className="w-full" />
          </div>
          <div className="mb-6">
            <Input type="password" placeholder="Mật khẩu" required className="w-full" />
          </div>
          <Button type="submit" className="w-full bg-purple-900 hover:bg-purple-700 text-white">
            Đăng nhập
          </Button>
        </form>
        <p className="mt-4 text-center">
          Chưa có tài khoản? <a href="/register" className="text-purple-900 hover:underline">Đăng ký ngay</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;