import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Link } from 'react-router-dom';
import { 
  Users, Award, Target, Shield, 
  ChartBar, Globe, Heart, Laptop,
  Coffee, CheckCircle, Building, Phone
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function About() {
  const stats = [
    { number: "3+", label: "Năm kinh nghiệm", icon: <Building className="w-6 h-6" /> },
    { number: "1000+", label: "Khách hàng", icon: <Users className="w-6 h-6" /> },
    { number: "5000+", label: "Dự án", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "24/7", label: "Hỗ trợ", icon: <Phone className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Target className="w-12 h-12 text-purple-500" />,
      title: "Sáng tạo không ngừng",
      description: "Luôn đổi mới và cập nhật công nghệ mới nhất"
    },
    {
      icon: <Heart className="w-12 h-12 text-purple-500" />,
      title: "Tận tâm với khách hàng",
      description: "Đặt lợi ích khách hàng lên hàng đầu"
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-500" />,
      title: "Chất lượng là số 1",
      description: "Cam kết chất lượng trong mọi sản phẩm"
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-500" />,
      title: "Tầm nhìn toàn cầu",
      description: "Hướng đến các tiêu chuẩn quốc tế"
    }
  ];

  const team = [
    {
      image: "images/person1.jpg",
      name: "Nguyễn Văn A",
      position: "CEO & Founder",
      quote: "Khát vọng dẫn đầu công nghệ"
    },
    {
      image: "images/person3.jpg",
      name: "Trần Thị B",
      position: "CTO",
      quote: "Đổi mới là DNA của chúng tôi"
    },  
    {
      image: "images/person4.jpg",
      name: "Lê Văn C",
      position: "Technical Director",
      quote: "Chất lượng là ưu tiên hàng đầu"
    }
  ];

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-purple-100 text-purple-600 mb-4">Về chúng tôi</Badge>
            <div className="container mx-auto flex items-center justify-between -mt-2">
  <motion.div 
    className="text-xl font-bold text-purple-800"
    whileHover={{ scale: 1.1 }}
  >
    <Link to="/">WareHouse Smart</Link>
  </motion.div>
  </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Định hình tương lai
              <span className="text-purple-900"> quản lý kho</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-500">
              Với hơn 10 năm kinh nghiệm, chúng tôi tự hào là đơn vị tiên phong trong lĩnh vực 
              cung cấp giải pháp quản lý kho thông minh tại Việt Nam
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="text-purple-500">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            {...fadeIn}
          >
            <div>
              <Badge className="bg-purple-100 text-purple-600 mb-4">Câu chuyện của chúng tôi</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Hành trình tiên phong trong công nghệ quản lý kho
              </h2>
              <p className="text-gray-600 mb-6">
                Được thành lập từ năm 2022, chúng tôi khởi đầu với khát vọng mang đến những giải pháp 
                công nghệ tiên tiến nhất trong lĩnh vực quản lý kho. Trải qua hơn hai năm, 
                chúng tôi đã không ngừng đổi mới và phát triển để tìm ra giải pháp quản lý kho thiết bị điện tử.
              </p>
              <p className="text-gray-600">
                Ngày nay, chúng tôi tự hào là đối tác tin cậy của hơn 1000 doanh nghiệp trên 
                khắp cả nước, từ các tập đoàn lớn đến các doanh nghiệp vừa và nhỏ.
              </p>
            </div>
            <div className="relative">
              <img 
                src="images/company.jpg" 
                alt="Company Story" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeIn}
          >
            <Badge className="bg-purple-200 text-purple-700 mb-4">Giá trị cốt lõi</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Những giá trị định hình nên chúng tôi
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-gray-500">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeIn}
          >
            <Badge className="bg-purple-100 text-purple-600 mb-4">Đội ngũ của chúng tôi</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Gặp gỡ những người dẫn dắt tầm nhìn
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-purple-600 mb-3">{member.position}</p>
                  <p className="text-gray-500 italic">"{member.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section  */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeIn}
          >
            <Badge className="bg-purple-200 text-purple-700 mb-4">Chứng nhận & Giải thưởng</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Những thành tựu đáng tự hào
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
   {[
    'images/thanhtuu1.jpg', 
    'images/thanhtuu2.png', 
    'images/thanhtuu3.webp', 
    'images/thanhtuu4.jpg',
  ].map((imageSrc, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <img 
        src={imageSrc} 
        alt={`Certification ${index + 1}`} 
        className="w-full h-auto"
      />
    </motion.div>
  ))}
          </div>
        </div>
      </div>
    </div>
  );
}