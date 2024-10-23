import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { BadgeCheck, BarChart2, Box, Cloud, Database, Lock, Search, Shield, Zap, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function solution() {
  const features = [
    {
      icon: <Database className="w-12 h-12 text-purple-500" />,
      title: "Quản lý kho realtime",
      description: "Cập nhật thông tin kho hàng theo thời gian thực, giúp nắm bắt chính xác tình trạng hàng hóa"
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-purple-500" />,
      title: "Báo cáo thống kê",
      description: "Phân tích dữ liệu chuyên sâu với các biểu đồ trực quan"
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-500" />,
      title: "Bảo mật tuyệt đối",
      description: "Hệ thống bảo mật đa lớp, mã hóa dữ liệu theo chuẩn quốc tế"
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500" />,
      title: "Tối ưu hiệu suất",
      description: "Tăng năng suất làm việc, giảm thiểu thời gian xử lý"
    },
    {
      icon: <Cloud className="w-12 h-12 text-purple-500" />,
      title: "Đồng bộ đám mây",
      description: "Truy cập và quản lý từ mọi nơi với công nghệ đám mây"
    },
    {
      icon: <Search className="w-12 h-12 text-purple-500" />,
      title: "Tìm kiếm thông minh",
      description: "Dễ dàng tra cứu thông tin với bộ lọc đa chiều"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between -mt-4">
  <motion.div 
    className="text-xl font-bold text-purple-800"
    whileHover={{ scale: 1.1 }}
  >
    <Link to="/">WareHouse Smart</Link>
  </motion.div>
</div>

          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Giải Pháp Quản Lý Kho
              <span className="text-purple-900"> Thông Minh</span>
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-xl text-gray-500 mb-10"
              {...fadeIn}
            >
              Tối ưu hóa quy trình, nâng cao hiệu suất với hệ thống quản lý kho điện tử hiện đại
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button size="lg" className="bg-purple-900 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg">
              <Link to="/login">Dùng thử miễn phí</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            {...fadeIn}
          >
            Tính năng nổi bật
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-500"
            {...fadeIn}
          >
            Khám phá các tính năng được thiết kế cho doanh nghiệp của bạn
          </motion.p>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-500">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lợi ích vượt trội
            </h2>
            <p className="text-xl text-gray-500">
              Tại sao doanh nghiệp nên chọn giải pháp của chúng tôi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8 text-purple-500" />,
                title: "Tiết kiệm 50% thời gian",
                description: "Tự động hóa quy trình quản lý"
              },
              {
                icon: <Lock className="w-8 h-8 text-purple-500" />,
                title: "An toàn tuyệt đối",
                description: "Bảo mật dữ liệu đa lớp"
              },
              {
                icon: <Box className="w-8 h-8 text-purple-500" />,
                title: "Quản lý toàn diện",
                description: "Kiểm soát mọi khía cạnh"
              },
              {
                icon: <BadgeCheck className="w-8 h-8 text-purple-500" />,
                title: "Độ chính xác cao",
                description: "Giảm thiểu sai sót"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-500">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white italic" >
              Sẵn sàng nâng cấp hệ thống của bạn?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Bắt đầu ngay hôm nay với gói dùng thử 30 ngày
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full text-lg">
            <Link to='https://zalo.me/0925360299'>Liên hệ tư vấn</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}