import React from 'react';
import { motion } from 'framer-motion';

const Solutions = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-10 text-center"
      >
        Giải pháp của chúng tôi
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          { title: "Quản lý kho hàng", description: "Hệ thống quản lý kho hàng thông minh, tối ưu hóa quy trình nhập xuất." },
          { title: "Bán hàng đa kênh", description: "Tích hợp và quản lý bán hàng trên nhiều nền tảng khác nhau." },
          { title: "Phân tích dữ liệu", description: "Công cụ phân tích dữ liệu nâng cao, giúp đưa ra quyết định kinh doanh chính xác." },
          { title: "Hỗ trợ khách hàng", description: "Hệ thống chăm sóc khách hàng tự động, nâng cao trải nghiệm người dùng." },
        ].map((solution, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-purple-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">{solution.title}</h2>
            <p>{solution.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;