import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-10 text-center"
      >
        Về chúng tôi
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Sứ mệnh của chúng tôi</h2>
          <p className="mb-6">
            Chúng tôi cam kết mang đến những giải pháp kinh doanh tốt nhất cho các đại lý, 
            giúp họ phát triển và thành công trong thị trường cạnh tranh hiện nay.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Giá trị cốt lõi</h2>
          <ul className="list-disc list-inside">
            <li>Đổi mới và sáng tạo</li>
            <li>Chất lượng và tin cậy</li>
            <li>Hợp tác và phát triển</li>
            <li>Trách nhiệm xã hội</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img src="/images/image_about_us.png" alt="Về chúng tôi" className="rounded-lg shadow-2xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default About;