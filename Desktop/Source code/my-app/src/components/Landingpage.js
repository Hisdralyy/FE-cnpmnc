import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Users, RefreshCcw, Gift } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    

      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 text-white">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <img src="/images/HomeDecor_1.png" alt="logo" className="w-40 h-40 rounded-lg shadow-2xl" />
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/solution" className="hover:text-purple-300">Giải pháp</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-300">Về chúng tôi</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-purple-300">Đăng nhập</Link>
              </li>
              <li>
                <Link to="/contact " className="hover:text-purple-300">Liên hệ</Link>
              </li>
              <li>
                <Link to="/product" className="hover:text-purple-300">Sản phẩm</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-5xl font-bold mb-6">Trở thành đại lý của chúng tôi ngay hôm nay!</h1>
            <p className="text-xl mb-8">Cùng phát triển, cùng thành công!</p>
            <Link to="/register" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full flex items-center">
              Đăng ký ngay
              <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2"
          >
            <img src="/images/qlk_tbdt.jpeg" alt="Đại lý làm việc" className="rounded-lg shadow-2xl" />
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="bg-purple-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Lợi ích khi trở thành đại lý</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BarChart2, title: "Chiết khấu cao", description: "Tận hưởng mức chiết khấu hấp dẫn, tối ưu hóa lợi nhuận của bạn." },
                { icon: Users, title: "Hỗ trợ marketing", description: "Đội ngũ marketing chuyên nghiệp hỗ trợ bạn trong mọi chiến dịch." },
                { icon: RefreshCcw, title: "Chính sách đổi trả", description: "Chính sách đổi trả linh hoạt, đảm bảo sự hài lòng của khách hàng." },
                { icon: Gift, title: "Ưu đãi độc quyền", description: "Nhận các ưu đãi và khuyến mãi độc quyền dành riêng cho đại lý." },
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-purple-700 p-6 rounded-lg shadow-lg"
                >
                  <benefit.icon className="w-12 h-12 mb-4 text-purple-300" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Sẵn sàng để bắt đầu?</h2>
            <p className="text-xl mb-8">Đăng ký ngay hôm nay và trở thành một phần của mạng lưới đại lý thành công của chúng tôi!</p>
            <Link to="/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg"
              >
                Đăng ký ngay
              </motion.button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-purple-900 py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-xl font-semibold mb-4">Về chúng tôi</h3>
                <p>Chúng tôi là đơn vị tiên phong trong lĩnh vực phân phối, luôn đặt sự hài lòng của đối tác lên hàng đầu.</p>
              </div>
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-xl font-semibold mb-4">Liên hệ</h3>
                <p>Email: contact@example.com</p>
                <p>Điện thoại: 0123 456 789</p>
                <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
              </div>
              <div className="w-full md:w-1/4 mb-6 md:mb-0">
                <h3 className="text-xl font-semibold mb-4">Theo dõi chúng tôi</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-purple-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-purple-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.475 4.058 4.058 0 01-1.861-.513v.052a4.109 4.109 0 003.292 4.022 4.099 4.099 0 01-1.092.145 4.07 4.07 0 01-.769-.073 4.116 4.116 0 003.835 2.843A8.24 8.24 0 012 18.292a11.607 11.607 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-purple-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2.002C6.475 2.002 2 6.477 2 12c0 5.524 4.475 9.998 10 9.998 5.524 0 10-4.474 10-9.998C22 6.477 17.524 2.002 12 2.002zm0 17.996c-4.232 0-7.998-3.766-7.998-7.998S7.768 4.002 12 4.002c4.232 0 7.998 3.766 7.998 7.998 0 4.232-3.766 7.998-7.998 7.998zm-1-12.999a1 1 0 10-2 0v4.586l-2.293 2.293a1 1 0 101.414 1.414L11 12.414V7.999z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>


  );
};

export default LandingPage;
